import { useState, useEffect, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { useGame } from '../../engine/GameContext'

export function RansomwareScene() {
  const { currentSceneIndex, phase } = useGame()
  const { i18n } = useTranslation()
  const isConsequence = phase === 'CONSEQUENCE'
  const en = i18n.language === 'en'
  return (
    <div className="pixel-scene">
      {currentSceneIndex === 0 && <UsbParkingScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 1 && <ZipEmailScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 2 && <LockedFilesScene consequence={isConsequence} en={en} />}
    </div>
  )
}

/* ── Scene 1: USB found in parking lot ── */
function UsbParkingScene({ consequence, en }: { consequence: boolean; en: boolean }) {
  const [animPhase, setAnimPhase] = useState(0)

  useEffect(() => {
    if (consequence) return
    const durations = [2800, 2500, 1800, 2800]
    const t = setTimeout(() => setAnimPhase(p => (p + 1) % 4), durations[animPhase])
    return () => clearTimeout(t)
  }, [animPhase, consequence])

  const isWalking = animPhase === 0 || animPhase === 3
  const showBubble = !consequence && (animPhase === 1 || animPhase === 2)

  const charStyle: CSSProperties = consequence
    ? { left: '42%' }
    : animPhase === 0 ? { left: '-80px', animation: 'usb-walk-in 2.8s linear forwards' }
    : animPhase === 3 ? { left: '42%',   animation: 'usb-walk-out 2.8s linear forwards' }
    :                   { left: '42%' }

  return (
    <>
      {consequence && <div className="sc-consequence-overlay" />}

      <div className="sc-ceiling outdoor" />
      <div className="sc-wall outdoor" />
      <div className="sc-floor outdoor" />

      {[20, 80, 150, 240, 320, 370, 60, 200, 300].map((x, i) => (
        <div key={i} style={{
          position: 'absolute', top: 6 + (i % 3) * 12, left: x,
          width: 2, height: 2, background: '#c0c0ff', opacity: 0.3 + (i % 3) * 0.15,
          animation: `sc-blink ${1.5 + i * 0.3}s step-end infinite`, zIndex: 2,
        }} />
      ))}

      {/* Street lamp */}
      <div style={{ position: 'absolute', left: 60, bottom: 48, width: 8, height: 130, background: '#2a2a3a', zIndex: 3 }} />
      <div style={{ position: 'absolute', left: 46, bottom: 170, width: 30, height: 8, background: '#2a2a3a', borderRadius: 4, zIndex: 3 }} />
      <div style={{
        position: 'absolute', left: 38, bottom: 172, width: 48, height: 20,
        background: consequence ? '#8b0000' : '#f0d060',
        borderRadius: '0 0 8px 8px',
        boxShadow: consequence ? '0 0 30px 10px rgba(200,0,0,0.25)' : '0 0 30px 10px rgba(240,208,96,0.12)',
        zIndex: 3, transition: 'all 0.5s',
      }} />

      {/* USB on ground */}
      <div className="sc-usb" style={{
        left: '55%', bottom: 58,
        transform: 'translateX(-50%) rotate(15deg)',
        filter: consequence ? 'drop-shadow(0 0 6px #e74c3c)' : undefined,
      }}>
        <div className="sc-usb-body">
          <div className="sc-usb-led" style={{ background: consequence ? '#e74c3c' : undefined }} />
        </div>
        <div className="sc-usb-tip" />
        <div className="sc-usb-label">{en ? 'SALARIES 2025' : 'SALARIOS 2025'}</div>
      </div>

      {/* Consequence popup */}
      {consequence && (
        <div style={{
          position: 'absolute', right: 16, top: 60,
          background: '#1a0000', border: '1px solid #e74c3c',
          padding: '6px 8px', zIndex: 20, maxWidth: 140,
        }}>
          <div style={{ fontSize: 8, color: '#ff4444', fontWeight: 'bold', marginBottom: 3 }}>
            ☠ {en ? 'AUTORUN EXECUTED' : 'AUTORUN EJECUTADO'}
          </div>
          <div style={{ fontSize: 7, color: '#cc3333' }}>
            ransomware.exe {en ? 'installing...' : 'instalando...'}
          </div>
          <div style={{ fontSize: 7, color: '#cc3333', marginTop: 2 }}>
            ● {en ? 'encrypting files...' : 'cifrando archivos...'}
          </div>
        </div>
      )}

      {/* Character */}
      <div className={`px-sprite${consequence ? ' panic' : ''}`} style={{ bottom: 48, ...charStyle }}>
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-blue'} />
        {isWalking && !consequence ? <div className="px-legs" /> : <div className="px-legs-still" />}
      </div>

      {showBubble && (
        <div className="sc-bubble" style={{ left: '22%', bottom: 155 }}>
          {en ? '"What is this?"' : '"¿Qué es esto?"'}
        </div>
      )}

      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ RANSOMWARE INSTALLED' : '☠ RANSOMWARE INSTALADO'}
        </div>
      )}
    </>
  )
}

/* ── Scene 2: Fake delivery email with ZIP attachment ── */
function ZipEmailScene({ consequence, en }: { consequence: boolean; en: boolean }) {
  return (
    <>
      {consequence && <div className="sc-consequence-overlay" />}

      <div className="sc-ceiling">
        <div className="sc-light" />
        <div className="sc-light dim" />
      </div>
      <div className="sc-wall" />
      <div className="sc-floor" />

      <div className="sc-camera sc-camera-r" />
      <div className="sc-cam-sweep sc-cam-sweep-r"><div className="sc-cam-ray" /></div>

      <div className="sc-desk" style={{ left: 60, right: 60 }}>
        <div className="sc-desk-top" />
        <div className="sc-desk-side sc-desk-side-l" />
        <div className="sc-desk-side sc-desk-side-r" />
      </div>

      <div className="sc-monitor" style={{ bottom: 100, left: '50%', transform: 'translateX(-50%)' }}>
        <div className="sc-monitor-bezel">
          <div
            className={`sc-monitor-screen active${consequence ? ' hacked' : ''}`}
            style={{ width: 210, height: 150, padding: 8 }}
          >
            {!consequence ? (
              <>
                <div style={{ fontSize: 7, color: '#3a5a6a', marginBottom: 4 }}>
                  📦 {en ? 'DELIVERY NOTIFICATION' : 'NOTIFICACIÓN DE ENTREGA'}
                </div>
                <div className="sc-screen-from">
                  {en ? 'From' : 'De'}: noreply@fedex-delivery-notifications.net
                </div>
                <div className="sc-screen-subject">
                  {en ? 'Your Dynapro package could not be delivered' : 'Tu paquete de Dynapro no pudo entregarse'}
                </div>
                <div className="sc-screen-body">
                  {en
                    ? 'To reschedule, download and print the attached label.'
                    : 'Para reprogramar, descarga la etiqueta adjunta e imprímela.'}
                </div>
                <div className="sc-screen-attachment">
                  <span style={{ color: '#f39c12' }}>
                    📎 {en ? 'delivery_label.zip' : 'etiqueta_envio.zip'}
                  </span>
                  <div style={{ fontSize: 6, color: '#4a5a6a', marginTop: 2 }}>2.4 MB</div>
                </div>
                <div className="sc-screen-warn">
                  ⚠ {en ? "Expecting something? If not — don't open" : '¿Pediste algo? Si no — no abras'}
                </div>
              </>
            ) : (
              <div className="sc-hacked-screen">
                <div className="sc-skull">☠</div>
                <div className="sc-hacked-title">{en ? 'ENCRYPTING FILES' : 'CIFRANDO ARCHIVOS'}</div>
                <div className="sc-hacked-line">cotizaciones.xlsx → .locked</div>
                <div className="sc-hacked-line">clientes_2025.pdf → .locked</div>
                <div className="sc-hacked-line" style={{ color: '#ff4444' }}>
                  ● {en ? 'exfiltrating data...' : 'exfiltrando datos...'}
                </div>
                <div className="sc-hacked-line">
                  USD 18.000 — 71:44 {en ? 'remaining' : 'restantes'}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="sc-monitor-neck" />
        <div className="sc-monitor-base" style={{ width: 240 }} />
      </div>

      <div className="sc-keyboard" style={{ bottom: 66, left: 100, width: 130 }} />

      <div className={`px-sprite${consequence ? ' panic' : ''}`} style={{ left: 64, bottom: 64 }}>
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-blue'} />
        <div className="px-legs-still" />
      </div>

      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, right: 16 }}>
          {en ? '☠ RANSOMWARE ACTIVE' : '☠ RANSOMWARE ACTIVO'}
        </div>
      )}
    </>
  )
}

/* ── Scene 3: Locked files — ransom screen ── */
function LockedFilesScene({ consequence, en }: { consequence: boolean; en: boolean }) {
  return (
    <>
      {consequence && <div className="sc-consequence-overlay" />}

      <div className="sc-ceiling">
        <div className="sc-light dim" />
        <div className="sc-light dim" />
      </div>
      <div className="sc-wall" />
      <div className="sc-floor" />

      <div className="sc-desk" style={{ left: 60, right: 60 }}>
        <div className="sc-desk-top" />
        <div className="sc-desk-side sc-desk-side-l" />
        <div className="sc-desk-side sc-desk-side-r" />
      </div>

      <div className="sc-monitor" style={{ bottom: 100, left: '50%', transform: 'translateX(-50%)' }}>
        <div className="sc-monitor-bezel" style={{ boxShadow: '0 0 30px rgba(231,76,60,0.3)' }}>
          <div
            className={`sc-monitor-screen${consequence ? ' hacked' : ''}`}
            style={{ width: 210, height: 150 }}
          >
            {!consequence ? (
              <div className="sc-screen-locked">
                <span className="sc-screen-skull">💀</span>
                <div className="sc-screen-ransom">
                  {en ? 'YOUR FILES HAVE BEEN ENCRYPTED' : 'TUS ARCHIVOS FUERON ENCRIPTADOS'}<br />
                  {en ? 'Pay 3,000 USD in Bitcoin' : 'Paga 3.000 USD en Bitcoin'}
                </div>
                <div className="sc-screen-timer">47:23:11</div>
                <div style={{ fontSize: 6, color: '#8a2020', marginBottom: 4 }}>
                  archivos.locked · documentos.locked
                </div>
                <div className="sc-screen-btc">₿ 1A3x...9kP2</div>
              </div>
            ) : (
              <div className="sc-hacked-screen" style={{ padding: 8 }}>
                <div className="sc-skull">₿</div>
                <div className="sc-hacked-title" style={{ color: '#ff9900' }}>
                  {en ? 'PAYMENT SENT' : 'PAGO ENVIADO'}
                </div>
                <div className="sc-hacked-line" style={{ color: '#ff4444', marginTop: 4 }}>
                  ✗ {en ? 'FILES STILL LOCKED' : 'ARCHIVOS AÚN BLOQUEADOS'}
                </div>
                <div className="sc-hacked-line">
                  {en ? 'no response from attacker' : 'sin respuesta del atacante'}
                </div>
                <div style={{ borderTop: '1px solid #3a0000', marginTop: 6, paddingTop: 5 }}>
                  <div className="sc-hacked-line" style={{ color: '#ff4444' }}>
                    ⚠ {en ? '3 more machines infected' : '3 equipos más infectados'}
                  </div>
                  <div className="sc-hacked-line">
                    {en ? 'network compromised' : 'red comprometida'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="sc-monitor-neck" />
        <div className="sc-monitor-base" style={{ width: 240 }} />
      </div>

      <div className={`px-sprite${consequence ? ' panic' : ''}`} style={{ left: 64, bottom: 64 }}>
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-blue'} />
        <div className="px-legs-still" />
      </div>

      {!consequence && (
        <div className="sc-bubble" style={{ left: 90, bottom: 160 }}>
          {en ? '"My files!"' : '"¡Mis archivos!"'}
        </div>
      )}

      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ PAYMENT LOST — NETWORK COMPROMISED' : '☠ PAGO PERDIDO — RED COMPROMETIDA'}
        </div>
      )}
    </>
  )
}
