import { useState, useEffect, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { useGame } from '../../engine/GameContext'

export function RemoteWorkScene() {
  const { currentSceneIndex, phase } = useGame()
  const { i18n } = useTranslation()
  const isConsequence = phase === 'CONSEQUENCE'
  const en = i18n.language === 'en'
  return (
    <div className="pixel-scene">
      {currentSceneIndex === 0 && <CafeWifiScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 1 && <VideoCallScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 2 && <AirportLaptopScene consequence={isConsequence} en={en} />}
    </div>
  )
}

/* ── Scene 1: Café public WiFi — man-in-the-middle ── */
function CafeWifiScene({ consequence, en }: { consequence: boolean; en: boolean }) {
  return (
    <>
      {consequence && <div className="sc-consequence-overlay" />}

      {/* Warm café ceiling */}
      <div className="sc-ceiling" style={{ background: 'repeating-linear-gradient(90deg, #201408 0px, #201408 79px, #181008 79px, #181008 80px)' }}>
        <div className="sc-light" style={{ background: '#f0c060', boxShadow: '0 0 20px 6px rgba(240,192,96,0.3)' }} />
        <div className="sc-light" style={{ background: '#f0c060', boxShadow: '0 0 20px 6px rgba(240,192,96,0.3)' }} />
      </div>
      <div className="sc-wall" style={{ background: '#120e08', backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 79px, #1a1208 79px, #1a1208 80px), repeating-linear-gradient(0deg, transparent, transparent 39px, #1a1208 39px, #1a1208 40px)' }} />
      <div className="sc-floor" style={{ background: 'repeating-linear-gradient(90deg, #1a1208 0px, #1a1208 39px, #140e06 39px, #140e06 40px)' }} />

      {/* Café table */}
      <div className="sc-table" style={{ left: '50%', transform: 'translateX(-50%)', width: 200 }}>
        <div className="sc-table-top" />
        <div className="sc-table-leg-l" />
        <div className="sc-table-leg-r" />
      </div>

      {/* Coffee cup */}
      <div style={{
        position: 'absolute', bottom: 62, right: '38%',
        width: 16, height: 20, background: '#2a1a0a', border: '2px solid #3a2a1a',
        borderRadius: '0 0 4px 4px', zIndex: 5,
      }}>
        <div style={{ position: 'absolute', top: -5, left: -3, right: -3, height: 8, background: '#4a2a1a', borderRadius: 3 }} />
        <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', fontSize: 8, animation: 'float 2s ease-in-out infinite', opacity: 0.6 }}>〜</div>
      </div>

      {/* WiFi sign */}
      <div style={{
        position: 'absolute', top: 70, right: 30, zIndex: 5,
        background: '#1a1208', border: '1px solid #3a2a0a',
        padding: '4px 8px', fontSize: 8, color: '#7ee8ff',
        fontFamily: 'Courier New', letterSpacing: 1,
      }}>
        📶 Starbucks_Guest
      </div>

      {/* Laptop on table */}
      <div className="sc-laptop" style={{ bottom: 62, left: '50%', transform: 'translateX(-40px)' }}>
        <div className="sc-laptop-screen" style={{ width: 120, padding: 2 }}>
          <div className={`sc-laptop-screen-inner${consequence ? ' hacked' : ''}`} style={{ width: 116, height: 70, padding: 5 }}>
            {!consequence ? (
              <>
                <div style={{ fontSize: 6, color: '#7ee8ff', marginBottom: 3 }}>🏭 ERP Dynapro</div>
                <div className="sc-screen-row" style={{ width: '85%' }} />
                <div className="sc-screen-row" style={{ width: '70%' }} />
                <div style={{ fontSize: 6, color: '#f39c12', marginTop: 3 }}>📡 {en ? 'Public WiFi detected' : 'WiFi público detectado'}</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 6, color: '#e74c3c', marginBottom: 2 }}>💀 MITM ACTIVE</div>
                <div style={{ fontSize: 5, color: '#ff6666' }}>● {en ? 'creds captured' : 'credenciales capturadas'}</div>
                <div style={{ fontSize: 5, color: '#ff6666' }}>● {en ? 'ERP session cloned' : 'sesión ERP clonada'}</div>
                <div style={{ fontSize: 5, color: '#ff4444', animation: 'sc-blink 0.6s step-end infinite' }}>
                  {en ? '● exfiltrating...' : '● exfiltrando...'}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="sc-laptop-hinge" />
        <div className="sc-laptop-base" style={{ width: 130, height: 14 }}>
          <div className="sc-laptop-touchpad" />
        </div>
      </div>

      {/* Employee */}
      <div className={`px-sprite${consequence ? ' panic' : ''}`} style={{ left: '50%', transform: 'translateX(-90px)', bottom: 48 }}>
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-blue'} />
        <div className="px-legs-still" />
      </div>

      {/* Attacker in café — only in consequence */}
      {consequence && (
        <div className="px-sprite" style={{ right: 60, bottom: 48 }}>
          <div className="px-head" />
          <div className="px-body-suit" />
          <div className="px-legs-still" />
        </div>
      )}

      {consequence && (
        <div className="sc-bubble" style={{ right: 40, bottom: 150 }}>
          {en ? '💻 Intercepting...' : '💻 Interceptando...'}
        </div>
      )}

      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ ERP CREDENTIALS STOLEN — MITM ATTACK' : '☠ CREDENCIALES ERP ROBADAS — ATAQUE MITM'}
        </div>
      )}
    </>
  )
}

/* ── Scene 2: Unsecured video call — Zoom Bombing ── */
function VideoCallScene({ consequence, en }: { consequence: boolean; en: boolean }) {
  return (
    <>
      {consequence && <div className="sc-consequence-overlay" />}

      <div className="sc-ceiling">
        <div className="sc-light" />
        <div className="sc-light" />
      </div>
      <div className="sc-wall" />
      <div className="sc-floor" />

      <div className="sc-desk" style={{ left: 60, right: 60 }}>
        <div className="sc-desk-top" />
        <div className="sc-desk-side sc-desk-side-l" />
        <div className="sc-desk-side sc-desk-side-r" />
      </div>

      {/* Monitor with video call */}
      <div className="sc-monitor" style={{ bottom: 100, left: '50%', transform: 'translateX(-50%)' }}>
        <div className="sc-monitor-bezel">
          <div className={`sc-monitor-screen active${consequence ? ' hacked' : ''}`} style={{ width: 210, height: 150, padding: 6 }}>
            {!consequence ? (
              <>
                <div style={{ fontSize: 7, color: '#7ee8ff', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
                  <span>📹 {en ? 'Teams — active call' : 'Teams — llamada activa'}</span>
                  <span style={{ color: '#e74c3c' }}>🔓 {en ? 'No password' : 'Sin contraseña'}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, marginBottom: 4 }}>
                  {[en ? 'Me' : 'Yo', 'Flowserve A', 'Flowserve B', '???'].map((name, i) => (
                    <div key={i} style={{
                      height: 36, background: i === 3 ? '#2a0a0a' : '#0a1828',
                      border: `1px solid ${i === 3 ? '#e74c3c' : '#1a3040'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 7, color: i === 3 ? '#e74c3c' : '#6090a0',
                    }}>
                      {i === 3 ? `⚠ ${en ? 'INTRUDER' : 'INTRUSO'}` : name}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 6, color: '#e74c3c', animation: 'sc-blink 1s step-end infinite' }}>
                  {en ? 'Unknown participant joined via link' : 'Participante desconocido unido al link'}
                </div>
              </>
            ) : (
              <div className="sc-hacked-screen">
                <div className="sc-skull">💸</div>
                <div className="sc-hacked-title" style={{ fontSize: 6 }}>
                  {en ? 'BID INTEL LEAKED' : 'PRECIOS FILTRADOS'}
                </div>
                <div className="sc-hacked-line">
                  {en ? 'competitor: 25 min in call' : 'competidor: 25 min en llamada'}
                </div>
                <div className="sc-hacked-line" style={{ color: '#ff4444' }}>
                  {en ? '● Panama Mining lost' : '● Panama Mining perdida'}
                </div>
                <div className="sc-hacked-line">USD 180,000</div>
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
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ COMPETITOR IN MEETING — USD 180K LOST' : '☠ COMPETIDOR EN REUNIÓN — USD 180K PERDIDOS'}
        </div>
      )}
    </>
  )
}

/* ── Scene 3: Laptop unattended at airport ── */
function AirportLaptopScene({ consequence, en }: { consequence: boolean; en: boolean }) {
  const [animPhase, setAnimPhase] = useState(0)

  useEffect(() => {
    if (consequence) return
    const durations = [2500, 3500, 3000]
    const t = setTimeout(() => setAnimPhase(p => (p + 1) % 3), durations[animPhase])
    return () => clearTimeout(t)
  }, [animPhase, consequence])

  const isWalking = animPhase === 0 || animPhase === 2
  const showWorkBubble = animPhase === 1

  const charStyle: CSSProperties =
    animPhase === 0 ? { left: '110%', animation: 'airport-walk-in 2.5s linear forwards' } :
    animPhase === 2 ? { left: '55%',  animation: 'airport-walk-out 3s linear forwards' } :
                     { left: '55%' }

  return (
    <>
      {consequence && <div className="sc-consequence-overlay" />}

      {/* Airport ceiling */}
      <div className="sc-ceiling" style={{ background: 'repeating-linear-gradient(90deg, #181820 0px, #181820 79px, #121218 79px, #121218 80px)', borderBottom: '2px solid #222232' }}>
        <div className="sc-light" />
        <div className="sc-light" />
        <div className="sc-light" />
      </div>
      <div className="sc-wall" style={{ background: '#101018', backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 79px, #18181f 79px, #18181f 80px)' }} />
      <div className="sc-floor" style={{ background: 'repeating-linear-gradient(90deg, #181820 0px, #181820 39px, #121218 39px, #121218 40px)' }} />

      {/* Airport seating / table */}
      <div className="sc-table" style={{ left: '50%', transform: 'translateX(-50%)', width: 200, bottom: 48 }}>
        <div className="sc-table-top" style={{ background: '#2a2a3a', border: '2px solid #3a3a4a' }} />
        <div className="sc-table-leg-l" style={{ background: '#1a1a2a' }} />
        <div className="sc-table-leg-r" style={{ background: '#1a1a2a' }} />
      </div>

      {/* Laptop — open, unattended */}
      <div className="sc-laptop" style={{ bottom: 62, left: '50%', transform: 'translateX(-40px)' }}>
        <div className="sc-laptop-screen" style={{ width: 120, padding: 2 }}>
          <div className={`sc-laptop-screen-inner${consequence ? ' hacked' : ''}`} style={{ width: 116, height: 70, padding: 5 }}>
            {!consequence ? (
              <>
                <div style={{ fontSize: 6, color: '#7ee8ff', marginBottom: 3 }}>✉ {en ? 'Dynapro ERP' : 'ERP Dynapro'}</div>
                <div className="sc-screen-row" style={{ width: '85%' }} />
                <div className="sc-screen-row" style={{ width: '60%' }} />
                <div style={{ fontSize: 6, color: '#f39c12', marginTop: 3 }}>{en ? 'No screen lock' : 'Sin bloqueo de pantalla'}</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 6, color: '#e74c3c', marginBottom: 2 }}>📸 {en ? 'PHOTOGRAPHED' : 'FOTOGRAFIADO'}</div>
                <div style={{ fontSize: 5, color: '#ff6666' }}>Aceros del Norte</div>
                <div style={{ fontSize: 5, color: '#ff6666' }}>Minería del Pacífico</div>
                <div style={{ fontSize: 5, color: '#ff4444', animation: 'sc-blink 1s step-end infinite' }}>
                  {en ? '2 contracts lost' : '2 contratos perdidos'}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="sc-laptop-hinge" />
        <div className="sc-laptop-base" style={{ width: 130, height: 14 }}>
          <div className="sc-laptop-touchpad" />
        </div>
      </div>

      {/* Animated employee (normal) or static panicking (consequence) */}
      {!consequence ? (
        <div className="px-sprite" style={{ bottom: 48, ...charStyle }}>
          <div className="px-head" />
          <div className="px-body-blue" />
          {isWalking ? <div className="px-legs" /> : <div className="px-legs-still" />}
        </div>
      ) : (
        <div className="px-sprite panic" style={{ bottom: 48, right: 80 }}>
          <div className="px-head" />
          <div className="px-body-red" />
          <div className="px-legs-still" />
        </div>
      )}

      {/* Spy photographing laptop in consequence */}
      {consequence && (
        <div className="px-sprite" style={{ left: '50%', transform: 'translateX(10px)', bottom: 48 }}>
          <div className="px-head" />
          <div className="px-body-suit" />
          <div className="px-legs-still" />
        </div>
      )}

      {consequence && (
        <div className="sc-bubble" style={{ left: '50%', transform: 'translateX(20px)', bottom: 150 }}>
          📸 {en ? 'Aceros del Norte...' : 'Aceros del Norte...'}
        </div>
      )}

      {!consequence && showWorkBubble && (
        <div className="sc-bubble" style={{ left: '43%', bottom: 155 }}>
          {en ? '"Just a moment..."' : '"Un momento..."'}
        </div>
      )}

      {/* Airport departure sign */}
      <div style={{
        position: 'absolute', top: 60, right: 20, zIndex: 5,
        background: '#0a0a1a', border: '1px solid #2a2a4a',
        padding: '3px 8px', fontSize: 7, color: '#f39c12',
        fontFamily: 'Courier New', letterSpacing: 1,
      }}>
        ✈ {en ? 'GATE A3 → MEX' : 'SALIDA A3 → MEX'}
      </div>

      {consequence && (
        <>
          <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 56, left: '50%', transform: 'translateX(-50%)' }}>
            {en ? '☠ CLIENT DATA PHOTOGRAPHED — 2 CONTRACTS LOST' : '☠ DATOS FOTOGRAFIADOS — 2 CONTRATOS PERDIDOS'}
          </div>
          <div className="sc-tag sc-tag-orange" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
            {en ? 'SHOULDER SURFING — ALWAYS LOCK + TAKE IT' : 'SHOULDER SURFING — SIEMPRE BLOQUEA Y LLÉVALA'}
          </div>
        </>
      )}
    </>
  )
}
