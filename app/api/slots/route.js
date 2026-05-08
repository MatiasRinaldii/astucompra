import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { google } from 'googleapis'

function readSecret(name) {
  let val = ''
  try {
    val = readFileSync(`/run/secrets/${name}`, 'utf8').trim()
  } catch {
    val = process.env[name] ?? ''
  }
  if (!val) {
    throw new Error(`CRITICAL: Secret or environment variable missing for ${name}`)
  }
  return val
}

function getCalendarClient() {
  const CALENDAR_ID     = readSecret('GOOGLE_CALENDAR_ID')
  const AVAILABILITY_CALENDAR_ID = readSecret('GOOGLE_AVAILABILITY_CALENDAR_ID')
  const CLIENT_EMAIL    = readSecret('GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL')
  const PRIVATE_KEY     = readSecret('GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY').replace(/\\n/g, '\n')

  const auth = new google.auth.JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: [
      'https://www.googleapis.com/auth/calendar',
    ],
    subject: CALENDAR_ID,
  })
  return { calendar: google.calendar({ version: 'v3', auth }), CALENDAR_ID, AVAILABILITY_CALENDAR_ID }
}

function generateSlotsFromRanges(ranges) {
  const slots = []
  const SLOT_MINUTES = 30
  const slotDurationMs = SLOT_MINUTES * 60 * 1000

  for (const range of ranges) {
    let current = range.start.getTime()
    const end = range.end.getTime()

    while (current + slotDurationMs <= end) {
      slots.push({
        start: new Date(current),
        end: new Date(current + slotDurationMs)
      })
      current += slotDurationMs
    }
  }
  return slots
}

export async function GET(request) {
  try {
    const { calendar, CALENDAR_ID, AVAILABILITY_CALENDAR_ID } = getCalendarClient()
    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const tz = searchParams.get('tz') || 'America/Argentina/Buenos_Aires'
    
    if (!year || !month) return NextResponse.json({ error: 'Missing year/month' }, { status: 400 })

    const timeMin = new Date(`${year}-${String(month).padStart(2,'0')}-01T00:00:00Z`).toISOString()
    const lastDay = new Date(Number(year), Number(month), 0).getDate()
    const timeMax = new Date(`${year}-${String(month).padStart(2,'0')}-${lastDay}T23:59:59Z`).toISOString()

    const availabilityRes = await calendar.events.list({
      calendarId: AVAILABILITY_CALENDAR_ID,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime',
    })
    
    const events = availabilityRes.data.items || []
    const availabilityRanges = events
      .filter(e => e.start?.dateTime && e.end?.dateTime)
      .map(e => ({
        start: new Date(e.start.dateTime),
        end: new Date(e.end.dateTime)
      }))
      
    const allAvailableSlots = generateSlotsFromRanges(availabilityRanges)

    const fbRes = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        timeZone: 'UTC',
        items: [{ id: CALENDAR_ID }],
      },
    })

    const busy = fbRes.data.calendars[CALENDAR_ID]?.busy ?? []
    const freeSlots = {}
    const now = new Date()

    for (const slot of allAvailableSlots) {
      if (slot.start <= now) continue

      const isBusy = busy.some((b) => {
        const bs = new Date(b.start)
        const be = new Date(b.end)
        return slot.start < be && slot.end > bs
      })

      if (!isBusy) {
        const localTime = slot.start.toLocaleTimeString('es-AR', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
        
        const localDay = String(
          new Date(slot.start.toLocaleString('en-US', { timeZone: tz })).getDate()
        )
        
        if (!freeSlots[localDay]) freeSlots[localDay] = []
        if (!freeSlots[localDay].find(s => s.time === localTime)) {
          freeSlots[localDay].push({
            time: localTime,
            utcStr: slot.start.toISOString()
          })
        }
      }
    }

    return NextResponse.json({ freeSlots })
  } catch (err) {
    console.error('[GET /api/slots]', err.message)
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 })
  }
}
