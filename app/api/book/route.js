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
  return { calendar: google.calendar({ version: 'v3', auth }), CALENDAR_ID }
}

export async function POST(request) {
  try {
    const { calendar, CALENDAR_ID } = getCalendarClient()
    const body = await request.json()
    const { nombre, email, tel, negocio, fact, slot, date, tz = 'America/Argentina/Buenos_Aires' } = body
    if (!nombre || !email || !slot || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const [slotH, slotM] = slot.split(':').map(Number)
    const localDateStr = `${date}T${String(slotH).padStart(2,'0')}:${String(slotM).padStart(2,'0')}:00`
    
    const startDT = `${date}T${String(slotH).padStart(2,'0')}:${String(slotM).padStart(2,'0')}:00`
    const endHM   = slotM === 30 ? `${String(slotH + 1).padStart(2,'0')}:00:00` : `${String(slotH).padStart(2,'0')}:30:00`
    const endDT   = `${date}T${endHM}`

    const event = {
      summary: `Diagnóstico AS Digital Partners — ${nombre}`,
      description: [
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        `WhatsApp: ${tel}`,
        `Negocio: ${negocio || '-'}`,
        `Facturación: ${fact || '-'}`,
      ].join('\n'),
      start: { dateTime: startDT, timeZone: tz },
      end:   { dateTime: endDT,   timeZone: tz },
      attendees: [{ email }],
      conferenceData: {
        createRequest: {
          requestId: `asdigital-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    }

    const evRes = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    })

    const meetLink = evRes.data.conferenceData?.entryPoints?.find(e => e.entryPointType === 'video')?.uri ?? null

    return NextResponse.json({ ok: true, meetLink, eventId: evRes.data.id })
  } catch (err) {
    console.error('[POST /api/book]', err.message)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}
