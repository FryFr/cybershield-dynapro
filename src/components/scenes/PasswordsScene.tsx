import { useTranslation } from 'react-i18next'
import { useGame } from '../../engine/GameContext'

export function PasswordsScene() {
  const { currentSceneIndex, phase } = useGame()
  const { i18n } = useTranslation()
  const isConsequence = phase === 'CONSEQUENCE'
  const en = i18n.language === 'en'
  return (
    <div className="pixel-scene">
      {currentSceneIndex === 0 && <SharePasswordScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 1 && <CreatePasswordScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 2 && <PostItScene consequence={isConsequence} en={en} />}
    </div>
  )
}

/* ── Scene 1: Coworker asks for password ── */
function SharePasswordScene({ consequence, en }: { consequence: boolean; en: boolean }) {
  return (
    <>
      {consequence && <div className="sc-consequence-overlay" />}

      <div className="sc-ceiling">
        <div className="sc-light" />
        <div className="sc-light" />
      </div>
      <div className="sc-wall" />
      <div className="sc-floor" />

      {/* Two desks */}
      <div className="sc-desk" style={{ left: 30, width: 160 }}>
        <div className="sc-desk-top" />
        <div className="sc-desk-side sc-desk-side-l" />
        <div className="sc-desk-side sc-desk-side-r" />
      </div>
      <div className="sc-desk" style={{ right: 30, width: 160 }}>
        <div className="sc-desk-top" />
        <div className="sc-desk-side sc-desk-side-l" />
        <div className="sc-desk-side sc-desk-side-r" />
      </div>

      {/* Monitor — normal or hacked */}
      <div className="sc-monitor" style={{ bottom: 100, right: 80 }}>
        <div className="sc-monitor-bezel">
          <div className={`sc-monitor-screen active${consequence ? ' hacked' : ''}`} style={{ width: 100, height: 70, padding: 5 }}>
            {consequence ? (
              <div className="sc-hacked-screen" style={{ fontSize: 6 }}>
                <div className="sc-skull" style={{ fontSize: 9 }}>💀</div>
                <div className="sc-hacked-title" style={{ fontSize: 6 }}>
                  {en ? 'SESSION HIJACKED' : 'SESIÓN SECUESTRADA'}
                </div>
                <div className="sc-hacked-line">
                  {en ? '1400 records exported' : '1400 registros exportados'}
                </div>
              </div>
            ) : (
              <>
                <div className="sc-screen-row" style={{ width: '85%' }} />
                <div className="sc-screen-row" style={{ width: '70%' }} />
                <div className="sc-screen-row" style={{ width: '90%' }} />
              </>
            )}
          </div>
        </div>
        <div className="sc-monitor-neck" />
        <div className="sc-monitor-base" style={{ width: 130 }} />
      </div>

      {/* Employee being asked */}
      <div className={`px-sprite${consequence ? ' panic' : ''}`} style={{ left: 50, bottom: 64 }}>
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-blue'} />
        <div className="px-legs-still" />
      </div>

      {/* Employee asking */}
      <div className="px-sprite" style={{ left: 130, bottom: 48 }}>
        <div className="px-head" />
        <div className="px-body-gray" />
        <div className="px-legs-still" />
      </div>

      <div className="sc-bubble" style={{ left: 100, bottom: 150 }}>
        {consequence
          ? (en ? '💀 Phishing clicked\nunder your session' : '💀 Phishing clicado\nen tu sesión')
          : (en ? '"Can I have\nyour password?"' : '"¿Me das tu\ncontraseña?"')}
      </div>

      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ YOUR ACCOUNT — YOUR RESPONSIBILITY' : '☠ TU CUENTA — TU RESPONSABILIDAD'}
        </div>
      )}
    </>
  )
}

/* ── Scene 2: Creating a new password ── */
function CreatePasswordScene({ consequence, en }: { consequence: boolean; en: boolean }) {
  return (
    <>
      {consequence && <div className="sc-consequence-overlay" />}

      <div className="sc-ceiling">
        <div className="sc-light" />
        <div className="sc-light dim" />
      </div>
      <div className="sc-wall" />
      <div className="sc-floor" />

      <div className="sc-desk" style={{ left: 60, right: 60 }}>
        <div className="sc-desk-top" />
        <div className="sc-desk-side sc-desk-side-l" />
        <div className="sc-desk-side sc-desk-side-r" />
      </div>

      {/* Password screen */}
      <div className="sc-monitor" style={{ bottom: 100, left: '50%', transform: 'translateX(-50%)' }}>
        <div className="sc-monitor-bezel">
          <div className={`sc-monitor-screen active${consequence ? ' hacked' : ''}`} style={{ width: 210, height: 150, padding: 10 }}>
            {!consequence ? (
              <>
                <div style={{ fontSize: 9, color: '#7ee8ff', marginBottom: 8, textAlign: 'center', letterSpacing: 1 }}>
                  🔑 {en ? 'NEW PASSWORD' : 'NUEVA CONTRASEÑA'}
                </div>
                <div style={{ background: '#2a1a1a', border: '1px solid #e74c3c', padding: '4px 6px', marginBottom: 4, fontSize: 8 }}>
                  <span style={{ color: '#e74c3c' }}>✗</span>
                  <span style={{ color: '#8a4a4a', marginLeft: 4 }}>Dynapro2025!</span>
                  <span style={{ fontSize: 6, color: '#6a2a2a', marginLeft: 4 }}>
                    — {en ? 'weak (company+year)' : 'débil (empresa+año)'}
                  </span>
                </div>
                <div style={{ background: '#1a2a1a', border: '1px solid #2ecc71', padding: '4px 6px', marginBottom: 4, fontSize: 8 }}>
                  <span style={{ color: '#2ecc71' }}>✓</span>
                  <span style={{ color: '#7ee8ff', marginLeft: 4 }}>
                    {en ? 'Rain!2-Rocket#9-Blue$7' : 'Lluvia!2-Cohete#9-Azul$7'}
                  </span>
                  <span style={{ fontSize: 6, color: '#3a7a4a', marginLeft: 4 }}>— {en ? 'strong' : 'fuerte'}</span>
                </div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 7, color: '#6090a0', marginBottom: 2 }}>
                    {en ? 'STRENGTH:' : 'FORTALEZA:'}
                  </div>
                  <div style={{ height: 6, background: '#0a1020', border: '1px solid #1a2a3a' }}>
                    <div style={{ height: '100%', width: '90%', background: 'linear-gradient(90deg, #e74c3c 0%, #f39c12 40%, #2ecc71 100%)' }} />
                  </div>
                </div>
              </>
            ) : (
              <div className="sc-hacked-screen">
                <div className="sc-skull">🔓</div>
                <div className="sc-hacked-title">
                  {en ? 'PASSWORD CRACKED' : 'CONTRASEÑA CRACKEADA'}
                </div>
                <div className="sc-hacked-line">Dynapro2025! → attempt #847</div>
                <div className="sc-hacked-line" style={{ color: '#ff4444' }}>
                  {en ? '● 3min 12sec' : '● 3min 12seg'}
                </div>
                <div className="sc-hacked-line">
                  {en ? 'ERP access: 4 days' : 'Acceso ERP: 4 días'}
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
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ ERP COMPROMISED — 4 DAYS UNDETECTED' : '☠ ERP COMPROMETIDO — 4 DÍAS SIN DETECTAR'}
        </div>
      )}
    </>
  )
}

/* ── Scene 3: Password on Post-it visible ── */
function PostItScene({ consequence, en }: { consequence: boolean; en: boolean }) {
  return (
    <>
      {consequence && <div className="sc-consequence-overlay" />}

      <div className="sc-ceiling">
        <div className="sc-light" />
        <div className="sc-light" />
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

      {/* Monitor with Post-it */}
      <div className="sc-monitor" style={{ bottom: 100, left: '50%', transform: 'translateX(-50%)' }}>
        <div className="sc-monitor-bezel">
          <div className="sc-monitor-screen active" style={{ width: 140, height: 100 }}>
            <div style={{ width: '100%', height: '100%', background: '#0a1a2a' }} />
          </div>
          {/* Post-it */}
          <div style={{
            position: 'absolute', top: 6, right: -18,
            width: 48, height: 44, background: consequence ? '#ff9900' : '#f0e040',
            border: `1px solid ${consequence ? '#cc7700' : '#c0b000'}`,
            padding: 4, fontSize: 7, color: '#2a1a00',
            fontFamily: 'Courier New', fontWeight: 'bold',
            zIndex: 10, transform: 'rotate(3deg)',
            boxShadow: '2px 2px 6px rgba(0,0,0,0.4)',
            animation: consequence ? 'tag-blink 1s step-end infinite' : 'none',
          }}>
            Admin@Dy25<br />ERP access<br />📸
          </div>
        </div>
        <div className="sc-monitor-neck" />
        <div className="sc-monitor-base" style={{ width: 180 }} />
      </div>

      {/* Empty chair — or stranger in consequence */}
      {!consequence ? (
        <div className="sc-chair" style={{ left: '50%', transform: 'translateX(-50%)' }}>
          <div className="sc-chair-back" />
          <div className="sc-chair-seat" />
        </div>
      ) : (
        <div className="px-sprite" style={{ left: '50%', transform: 'translateX(-50%)', bottom: 48 }}>
          <div className="px-head" />
          <div className="px-body-suit" />
          <div className="px-legs-still" />
        </div>
      )}

      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ ADMIN CREDENTIALS PHOTOGRAPHED' : '☠ CREDENCIALES ADMIN FOTOGRAFIADAS'}
        </div>
      )}
    </>
  )
}
