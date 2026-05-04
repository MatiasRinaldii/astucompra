import { useState, useCallback } from 'react'

/* ── Constants ── */
const MONTHS = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
]
const MONTHS_SHORT = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

const SLOTS = []
for (let h = 10; h < 16; h++) {
  SLOTS.push(`${String(h).padStart(2,'0')}:00`)
  SLOTS.push(`${String(h).padStart(2,'0')}:30`)
}
const INIT_TAKEN = { '2':['10:00','11:30'],'5':['14:00','15:00'],'9':['10:30'],'14':['13:00','14:30'],'16':['11:00'] }

const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6
const isPast = (d) => {
  const t = new Date()
  return d < new Date(t.getFullYear(), t.getMonth(), t.getDate())
}

/* ════════ SLOTS POPUP ════════ */
function SlotsPopup({ date, taken, onSelect, onClose }) {
  const dayKey = String(date.getDate())
  const takenSet = new Set(taken[dayKey] || [])
  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="slots-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="slots-date">{date.getDate()} de {MONTHS[date.getMonth()]} {date.getFullYear()}</div>
        <h3 className="slots-title">Elegí un horario</h3>
        <p className="slots-hint">Zona horaria: Buenos Aires (ART) / CDMX · Lunes a viernes</p>
        <div className="slots-grid">
          {SLOTS.map((s) => {
            const isTaken = takenSet.has(s)
            return (
              <button key={s} className={`sl-btn ${isTaken ? 'taken' : 'ok'}`} disabled={isTaken}
                onClick={() => !isTaken && onSelect(s)}>
                {s}
                {isTaken && <span className="sl-taken-label">Ocupado</span>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ════════ FORM MODAL ════════ */
function FormModal({ date, slot, onConfirm, onClose }) {
  const [form, setForm] = useState({ nombre:'', email:'', tel:'', negocio:'', fact:'', inversion: false })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = () => {
    const errs = {}
    if (!form.nombre.trim()) errs.nombre = true
    if (!form.email.trim())  errs.email  = true
    if (!form.tel.trim())    errs.tel    = true
    if (!form.negocio.trim()) errs.negocio = true
    if (!form.fact) errs.fact = true
    setErrors(errs)
    if (Object.keys(errs).length) return
    setSuccess(true)
    setTimeout(() => { onConfirm(); onClose() }, 2200)
  }
  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        {!success ? (
          <>
            <div className="modal-badge">{date.getDate()} {MONTHS_SHORT[date.getMonth()]} · {slot} hs</div>
            <h3 className="modal-title">Reservar diagnóstico</h3>
            <p className="modal-sub">Completá tus datos y confirmamos la reunión.</p>
            <div className="mf-row two">
              <div className="mf-field">
                <label>Nombre completo</label>
                <input type="text" placeholder="Juan García" value={form.nombre} onChange={set('nombre')}
                  style={errors.nombre ? { borderColor:'#EF4444' } : {}} />
              </div>
              <div className="mf-field">
                <label>Email</label>
                <input type="email" placeholder="juan@empresa.com" value={form.email} onChange={set('email')}
                  style={errors.email ? { borderColor:'#EF4444' } : {}} />
              </div>
            </div>
            <div className="mf-row two">
              <div className="mf-field">
                <label>Teléfono / WhatsApp</label>
                <input type="tel" placeholder="+54 9 11 ..." value={form.tel} onChange={set('tel')}
                  style={errors.tel ? { borderColor:'#EF4444' } : {}} />
              </div>
              <div className="mf-field">
                <label>Nombre del negocio</label>
                <input type="text" placeholder="Mi Empresa SRL" value={form.negocio} onChange={set('negocio')}
                  style={errors.negocio ? { borderColor:'#EF4444' } : {}} />
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
              </div>
            </div>
            <div className="mf-row" style={{ marginTop: '10px', marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--ink-2)' }}>
                <input type="checkbox" checked={form.inversion} onChange={(e) => setForm(f => ({ ...f, inversion: e.target.checked }))} style={{ width: 'auto', margin: 0 }} />
                Tengo al menos 1500 USD para invertir en escalar mi negocio.
              </label>
            </div>
            <button className="modal-btn" onClick={submit}>Confirmar diagnóstico →</button>
            <p className="modal-note">Sin cargo · Respuesta en menos de 24 hs</p>
          </>
        ) : (
          <div className="modal-success show">
            <div className="ms-ico">✅</div>
            <div className="ms-title">¡Diagnóstico reservado!</div>
            <p className="ms-sub">{date.getDate()} de {MONTHS[date.getMonth()]} a las {slot} hs</p>
            <p className="ms-note">Te escribo por WhatsApp/email con el link a la reunión.</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ════════ CALENDAR GRID ════════ */
function CalendarGrid({ calDate, selDate, onDayClick }) {
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
    let cls = 'cd'
    if (isSel)           cls = 'cd sel'
    else if (we || past) cls = 'cd dis'
    else                 cls = 'cd avail'
    if (isToday && !past) cls += ' today'
    cells.push(
      <div key={n} className={cls} onClick={() => !we && !past && onDayClick(dt)}>
        <span className="cd-num">{n}</span>
        {!we && !past && !isSel && <span className="cd-dot" />}
      </div>
    )
  }
  return <>{cells}</>
}

/* ════════ MAIN ════════ */
export default function Calendar() {
  const now = new Date()
  const [calDate, setCalDate]     = useState(new Date(now.getFullYear(), now.getMonth(), 1))
  const [selDate, setSelDate]     = useState(null)
  const [selSlot, setSelSlot]     = useState(null)
  const [taken, setTaken]         = useState(INIT_TAKEN)
  const [popup, setPopup]         = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  const prevMonth = () => { setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1)); setSelDate(null) }
  const nextMonth = () => { setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1)); setSelDate(null) }

  const handleDayClick = useCallback((dt) => { setSelDate(dt); setPopup('slots') }, [])
  const handleSlotSelect = (slot) => { setSelSlot(slot); setPopup('form') }
  const handleConfirm = () => {
    const dk = String(selDate.getDate())
    setTaken((prev) => ({ ...prev, [dk]: [...(prev[dk] || []), selSlot] }))
    setConfirmed(true)
  }

  return (
    <div className="section-blue" id="agenda">
      <div className="section-inner">

        {/* Two-column layout — eyebrow/h2 inside left col so alignment is natural */}
        <div className="cal-wrap reveal">

          {/* ── LEFT col: header + desc + features ── */}
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
              { ico:'⏱', t:'20 minutos por Google Meet',           s:'Link autogenerado al confirmar' },
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

          {/* ── RIGHT col: calendar or confirmed ── */}
          <div className="cal-widget-col">
            {!confirmed ? (
              <div className="cal-widget">
                <div className="cal-head">
                  <div className="cal-head-left">
                    <div className="cal-mname">{MONTHS[calDate.getMonth()]} {calDate.getFullYear()}</div>
                    <div className="cal-subtitle">Seleccioná un día disponible</div>
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
                <div className="cal-grid">
                  <CalendarGrid calDate={calDate} selDate={selDate} onDayClick={handleDayClick} />
                </div>
                <div className="cal-legend">
                  <span className="leg-item"><span className="leg-dot leg-avail" />Disponible</span>
                  <span className="leg-item"><span className="leg-dot leg-sel" />Seleccionado</span>
                  <span className="leg-item"><span className="leg-dot leg-dis" />No disponible</span>
                </div>
              </div>
            ) : (
              /* Confirmation — same visual weight as the calendar widget */
              <div className="cal-confirmed show">
                <div className="cc-top">
                  <div className="cc-icon-wrap">🗓️</div>
                  <div className="cc-title">¡Muchas gracias!</div>
                  <p className="cc-msg">
                    Diagnóstico agendado para el {selDate?.getDate()} de{' '}
                    {MONTHS[selDate?.getMonth()]} a las {selSlot} hs.
                  </p>
                  <p className="cc-detail">Recibirás un email con los detalles de la llamada.</p>
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
        <SlotsPopup date={selDate} taken={taken} onSelect={handleSlotSelect} onClose={() => setPopup(null)} />
      )}
      {popup === 'form' && selDate && selSlot && (
        <FormModal date={selDate} slot={selSlot} onConfirm={handleConfirm} onClose={() => setPopup(null)} />
      )}
    </div>
  )
}
