'use client'
import { useState, useCallback, useEffect } from 'react'

/* ── Constants ── */
const MONTHS = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
]
const MONTHS_SHORT = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']


const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6
const isPast = (d) => {
  const t = new Date()
  return d < new Date(t.getFullYear(), t.getMonth(), t.getDate())
}

/* Format a date as YYYY-MM-DD in a given timezone */
function toLocalDateStr(date, tz) {
  return date.toLocaleDateString('sv-SE', { timeZone: tz })
}

/* Get display label for timezone */
function tzLabel(tz) {
  const labels = {
    'America/Argentina/Buenos_Aires': 'Buenos Aires (ART)',
    'America/Mexico_City': 'CDMX (CST/CDT)',
    'America/Monterrey': 'Monterrey (CST/CDT)',
    'America/Bogota': 'Bogotá (COT)',
    'America/Lima': 'Lima (PET)',
    'America/Santiago': 'Santiago (CLT)',
    'America/Montevideo': 'Montevideo (UYT)',
    'America/New_York': 'New York (ET)',
    'America/Los_Angeles': 'Los Angeles (PT)',
    'Europe/Madrid': 'Madrid (CET)',
  }
  return labels[tz] ?? tz.replace('_', ' ')
}

/* ════════ SLOTS POPUP ════════ */
function SlotsPopup({ date, freeSlots, userTz, onSelect, onClose }) {
  const dayKey  = String(date.getDate())
  const daySlots = freeSlots[dayKey] || []

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="slots-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="slots-date">{date.getDate()} de {MONTHS[date.getMonth()]} {date.getFullYear()}</div>
        <h3 className="slots-title">Elegí un horario</h3>
        <p className="slots-hint">Tu zona horaria: {tzLabel(userTz)} · Lunes a viernes</p>
        <div className="slots-grid">
          {daySlots.length === 0 && <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)' }}>No hay horarios disponibles.</p>}
          {daySlots.map(({ time }) => {
            return (
              <button key={time} className="sl-btn ok"
                onClick={() => onSelect(time, time)}>
                {time}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ════════ FORM MODAL ════════ */
function FormModal({ date, slot, slotLocal, userTz, onConfirm, onClose }) {
  const [form, setForm] = useState({ nombre:'', email:'', tel:'', negocio:'', fact:'', inversion: false })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [success, setSuccess] = useState(null)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    const errs = {}
    if (!form.nombre.trim()) errs.nombre = 'El nombre es obligatorio'
    
    if (!form.email.trim()) {
      errs.email = 'El email es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'El email no es válido'
    }
    
    if (!form.tel.trim()) {
      errs.tel = 'El teléfono es obligatorio'
    } else if (!/^\+?[\d\s-]{8,}$/.test(form.tel)) {
      errs.tel = 'El teléfono no es válido'
    }
    
    if (!form.negocio.trim()) errs.negocio = 'El negocio es obligatorio'
    if (!form.fact) errs.fact = 'Debes seleccionar la facturación'
    if (!form.inversion) errs.inversion = 'Debes confirmar la capacidad de inversión'
    
    setErrors(errs)
    if (Object.keys(errs).length) return

    setLoading(true)
    setApiError('')
    try {
      const dateStr = toLocalDateStr(date, userTz)
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          tel: form.tel,
          negocio: form.negocio,
          fact: form.fact,
          slot,
          date: dateStr,
          tz: userTz,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Error al reservar')
      setSuccess(data)
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'booking_confirmed', negocio: form.negocio, facturacion: form.fact })
      setTimeout(() => { onConfirm(); onClose() }, 3000)
    } catch (err) {
      setApiError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        {!success ? (
          <>
            <div className="modal-badge">{date.getDate()} {MONTHS_SHORT[date.getMonth()]} · {slotLocal} hs</div>
            <h3 className="modal-title">Reservar diagnóstico</h3>
            <p className="modal-sub">Completá tus datos y confirmamos la reunión.</p>
            <div className="mf-row two">
              <div className="mf-field">
                <label>Nombre completo</label>
                <input type="text" placeholder="Juan García" value={form.nombre} onChange={set('nombre')}
                  style={errors.nombre ? { borderColor:'#EF4444' } : {}} />
                {errors.nombre && <span style={{ color:'#EF4444', fontSize:'0.75rem', marginTop:'4px' }}>{errors.nombre}</span>}
              </div>
              <div className="mf-field">
                <label>Email</label>
                <input type="email" placeholder="juan@empresa.com" value={form.email} onChange={set('email')}
                  style={errors.email ? { borderColor:'#EF4444' } : {}} />
                {errors.email && <span style={{ color:'#EF4444', fontSize:'0.75rem', marginTop:'4px' }}>{errors.email}</span>}
              </div>
            </div>
            <div className="mf-row two">
              <div className="mf-field">
                <label>Teléfono / WhatsApp</label>
                <input type="tel" placeholder="+54 9 11 ..." value={form.tel} onChange={set('tel')}
                  style={errors.tel ? { borderColor:'#EF4444' } : {}} />
                {errors.tel && <span style={{ color:'#EF4444', fontSize:'0.75rem', marginTop:'4px' }}>{errors.tel}</span>}
              </div>
              <div className="mf-field">
                <label>Nombre del negocio</label>
                <input type="text" placeholder="Mi Empresa SRL" value={form.negocio} onChange={set('negocio')}
                  style={errors.negocio ? { borderColor:'#EF4444' } : {}} />
                {errors.negocio && <span style={{ color:'#EF4444', fontSize:'0.75rem', marginTop:'4px' }}>{errors.negocio}</span>}
              </div>
            </div>
            <div className="mf-row">
              <div className="mf-field">
                <label>Facturación mensual aproximada</label>
                <select value={form.fact} onChange={set('fact')} style={errors.fact ? { borderColor:'#EF4444' } : {}}>
                  <option value="" disabled>Seleccioná un rango</option>
                  <option>&lt;10k USD</option>
                  <option>Entre 10 y 100k USD</option>
                  <option>+100k USD</option>
                  <option>+500k USD</option>
                  <option>+1M USD</option>
                </select>
                {errors.fact && <span style={{ color:'#EF4444', fontSize:'0.75rem', marginTop:'4px' }}>{errors.fact}</span>}
              </div>
            </div>
            <div className="mf-row" style={{ marginTop: '10px', marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer', color: errors.inversion ? '#EF4444' : 'var(--ink-2)' }}>
                <input type="checkbox" checked={form.inversion} onChange={(e) => setForm(f => ({ ...f, inversion: e.target.checked }))} style={{ width: 'auto', margin: 0 }} />
                Tengo al menos 1500 USD para invertir en escalar mi negocio.
              </label>
            </div>
            {apiError && <p style={{ color:'#EF4444', fontSize:'.82rem', marginBottom:'12px' }}>{apiError}</p>}
            <button className="modal-btn" onClick={submit} disabled={loading}>
              {loading ? 'Reservando...' : 'Confirmar diagnóstico →'}
            </button>
            <p className="modal-note">Sin cargo · Link de Google Meet generado automáticamente</p>
          </>
        ) : (
          <div className="modal-success show">
            <div className="ms-ico">✅</div>
            <div className="ms-title">¡Diagnóstico reservado!</div>
            <p className="ms-sub">{date.getDate()} de {MONTHS[date.getMonth()]} a las {slotLocal} hs ({tzLabel(userTz)})</p>
            {success.meetLink && (
              <p className="ms-note">
                <a href={success.meetLink} target="_blank" rel="noopener noreferrer" style={{ color:'var(--primary)', fontWeight:700 }}>
                  🎥 Unirse a Google Meet
                </a>
              </p>
            )}
            <p className="ms-note">Te enviamos los detalles por email.</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ════════ CALENDAR GRID ════════ */
function CalendarGrid({ calDate, selDate, freeSlots, onDayClick }) {
  const first = new Date(calDate.getFullYear(), calDate.getMonth(), 1).getDay()
  const days  = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 0).getDate()
  const today = new Date()
  const cells = []
  for (let i = 0; i < first; i++) cells.push(<div key={`e${i}`} className="cd empty" />)
  for (let n = 1; n <= days; n++) {
    const dt      = new Date(calDate.getFullYear(), calDate.getMonth(), n)
    const we      = isWeekend(dt)
    const past    = isPast(dt)
    const isToday = dt.toDateString() === today.toDateString()
    const isSel   = selDate && dt.toDateString() === selDate.toDateString()
    
    // Check if day has free slots
    const dayKey = String(dt.getDate())
    const hasSlots = freeSlots && freeSlots[dayKey] && freeSlots[dayKey].length > 0
    
    let cls = 'cd'
    if (isSel)           cls = 'cd sel'
    else if (we || past || !hasSlots) cls = 'cd dis'
    else                 cls = 'cd avail'
    if (isToday && !past) cls += ' today'
    cells.push(
      <div key={n} className={cls} onClick={() => !we && !past && hasSlots && onDayClick(dt)}>
        <span className="cd-num">{n}</span>
        {!we && !past && hasSlots && !isSel && <span className="cd-dot" />}
      </div>
    )
  }
  return <>{cells}</>
}

/* ════════ MAIN ════════ */
export default function Calendar() {
  const now     = new Date()
  const userTz  = Intl.DateTimeFormat().resolvedOptions().timeZone

  const [calDate, setCalDate]     = useState(new Date(now.getFullYear(), now.getMonth(), 1))
  const [selDate, setSelDate]     = useState(null)
  const [selSlot, setSelSlot]     = useState(null)     // ART slot key
  const [selSlotLocal, setSelSlotLocal] = useState(null) // display label in user tz
  const [freeSlots, setFreeSlots] = useState({})
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [popup, setPopup]         = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  /* Fetch busy slots from API whenever month changes */
  useEffect(() => {
    setLoadingSlots(true)
    const year  = calDate.getFullYear()
    const month = calDate.getMonth() + 1
    fetch(`/api/slots?year=${year}&month=${month}&tz=${encodeURIComponent(userTz)}`)
      .then(r => r.json())
      .then(data => setFreeSlots(data.freeSlots ?? {}))
      .catch(() => setFreeSlots({}))
      .finally(() => setLoadingSlots(false))
  }, [calDate, userTz])

  const prevMonth = () => { setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1)); setSelDate(null) }
  const nextMonth = () => { setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1)); setSelDate(null) }

  const handleDayClick = useCallback((dt) => { setSelDate(dt); setPopup('slots') }, [])
  const handleSlotSelect = (artSlot, localStr) => {
    setSelSlot(artSlot)
    setSelSlotLocal(localStr)
    setPopup('form')
  }
  const handleConfirm = () => {
    // Optimistically remove the selected slot so it isn't available anymore
    const dk = String(selDate.getDate())
    setFreeSlots((prev) => ({
      ...prev,
      [dk]: (prev[dk] || []).filter(s => s.time !== selSlot)
    }))
    setConfirmed(true)
  }

  return (
    <div className="section-blue" id="agenda">
      <div className="section-inner">

        <div className="cal-wrap reveal">

          {/* ── LEFT col ── */}
          <div className="cal-features-col">
            <div className="eyebrow" style={{ marginBottom: '16px' }}>Agendá tu llamada</div>
            <h2 className="sh" style={{ marginBottom: '14px' }}>
              Diagnóstico gratuito<br />de 20 minutos.
            </h2>
            <p className="sp" style={{ marginBottom: '28px' }}>
              Te digo exactamente qué está frenando tus ventas.
              Sin compromiso. Sin pitch. Solo claridad.
              <br/><br/>
              <strong style={{color: 'var(--primary)', fontWeight: 700}}>Cupos limitados:</strong> Tomo solo 3 cuentas nuevas por mes — auditamos antes de aceptar.
            </p>
            {[
              { ico:'⏱', t:'20 minutos por Google Meet', s:'Link autogenerado al confirmar' },
              { ico:'🔍', t:'Auditoría express en vivo',     s:'Revisamos tus publicaciones y métricas juntos' },
              { ico:'🎯', t:'3 acciones concretas para hoy', s:'Te vas con un plan, no con promesas' },
              { ico:'🤝', t:'Sin compromiso de contratación',s:'100% gratis, sin presión' },
            ].map((f) => (
              <div className="cal-feat" key={f.t}>
                <div className="feat-ico">{f.ico}</div>
                <div>
                  <div className="ft">{f.t}</div>
                  <div className="fs">{f.s}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── RIGHT col ── */}
          <div className="cal-widget-col">
            {!confirmed ? (
              <div className="cal-widget">
                <div className="cal-head">
                  <div className="cal-head-left">
                    <div className="cal-mname">{MONTHS[calDate.getMonth()]} {calDate.getFullYear()}</div>
                    <div className="cal-subtitle">
                      {loadingSlots ? 'Cargando disponibilidad...' : 'Seleccioná un día disponible'}
                    </div>
                  </div>
                  <div className="cal-nav">
                    <button className="cal-btn" onClick={prevMonth}>‹</button>
                    <button className="cal-btn" onClick={nextMonth}>›</button>
                  </div>
                </div>
                <div className="cal-wdays">
                  {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map((d, i) => (
                    <span key={d} className={i === 0 || i === 6 ? 'cal-wd-gray' : ''}>{d}</span>
                  ))}
                </div>
                <div className="cal-grid" style={{ opacity: loadingSlots ? 0.5 : 1, transition: 'opacity .3s' }}>
                  <CalendarGrid calDate={calDate} selDate={selDate} freeSlots={freeSlots} onDayClick={handleDayClick} />
                </div>
                <div className="cal-legend">
                  <span className="leg-item"><span className="leg-dot leg-avail" />Disponible</span>
                  <span className="leg-item"><span className="leg-dot leg-sel" />Seleccionado</span>
                  <span className="leg-item"><span className="leg-dot leg-dis" />No disponible</span>
                </div>
              </div>
            ) : (
              <div className="cal-confirmed show">
                <div className="cc-top">
                  <div className="cc-icon-wrap">🗓️</div>
                  <div className="cc-title">¡Muchas gracias!</div>
                  <p className="cc-msg">
                    Diagnóstico agendado para el {selDate?.getDate()} de{' '}
                    {MONTHS[selDate?.getMonth()]} a las {selSlotLocal} hs.
                  </p>
                  <p className="cc-detail">Revisá tu email — el link de Google Meet ya está ahí.</p>
                </div>
                <div className="cc-chips">
                  <span className="cc-chip">✓ Confirmado</span>
                  <span className="cc-chip">✓ Sin costo</span>
                  <span className="cc-chip">✓ Revisamos tu cuenta</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {popup === 'slots' && selDate && (
        <SlotsPopup date={selDate} freeSlots={freeSlots} userTz={userTz} onSelect={handleSlotSelect} onClose={() => setPopup(null)} />
      )}
      {popup === 'form' && selDate && selSlot && (
        <FormModal date={selDate} slot={selSlot} slotLocal={selSlotLocal} userTz={userTz} onConfirm={handleConfirm} onClose={() => setPopup(null)} />
      )}
    </div>
  )
}
