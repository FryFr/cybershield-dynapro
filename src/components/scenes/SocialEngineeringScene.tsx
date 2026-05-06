import { useTranslation } from 'react-i18next'
import { useGame } from '../../engine/GameContext'

export function SocialEngineeringScene() {
  const { currentSceneIndex, phase } = useGame()
  const { i18n } = useTranslation()
  const isConsequence = phase === 'CONSEQUENCE'
  const en = i18n.language === 'en'
  return (
    <div className="pixel-scene">
      {currentSceneIndex === 0 && <FakeCallScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 1 && <CeoFraudScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 2 && <PretextingScene consequence={isConsequence} en={en} />}
    </div>
  )
}

/* ── Scene 1: Fake Microsoft support call (Vishing) ── */
function FakeCallScene({ consequence, en }: { consequence: boolean; en: boolean }) {
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

      {/* Monitor — normal or hacked */}
      <div className="sc-monitor" style={{ bottom: 100, left: 180 }}>
        <div className="sc-monitor-bezel">
          <div className={`sc-monitor-screen active${consequence ? ' hacked' : ''}`} style={{ width: 120, height: 80, padding: 6 }}>
            {consequence ? (
              <div className="sc-hacked-screen" style={{ fontSize: 6 }}>
                <div className="sc-skull" style={{ fontSize: 10 }}>💀</div>
                <div className="sc-hacked-title" style={{ fontSize: 6 }}>RAT INSTALLED</div>
                <div className="sc-hacked-line">keylogger: active</div>
                <div className="sc-hacked-line" style={{ color: '#ff4444' }}>● capturing creds...</div>
              </div>
            ) : (
              <>
                <div className="sc-screen-row" style={{ width: '90%' }} />
                <div className="sc-screen-row" style={{ width: '75%' }} />
                <div className="sc-screen-row" style={{ width: '85%' }} />
                <div className="sc-screen-row" style={{ width: '60%' }} />
              </>
            )}
          </div>
        </div>
        <div className="sc-monitor-neck" />
        <div className="sc-monitor-base" style={{ width: 150 }} />
      </div>

      {/* Ringing or silent phone on desk */}
      <div style={{
        position: 'absolute', bottom: 72, right: 100, zIndex: 5,
        animation: consequence ? 'none' : 'px-bob 0.3s steps(2) infinite',
      }}>
        <div style={{ width: 48, height: 32, background: '#1a2030', border: `2px solid ${consequence ? '#e74c3c' : '#2a3040'}`, borderRadius: 4, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 4, left: 6, width: 36, height: 10, background: '#050d18', border: '1px solid #0a1a28', fontSize: 6, color: consequence ? '#e74c3c' : '#7ee8ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {consequence ? (en ? '☠ ACCESS GRANTED' : '☠ ACCESO DADO') : (en ? 'INCOMING CALL' : 'LLAMADA ENTRANTE')}
          </div>
          <div style={{ position: 'absolute', bottom: 5, left: '50%', transform: 'translateX(-50%)', fontSize: 10 }}>
            {consequence ? '🔓' : '📞'}
          </div>
        </div>
      </div>

      {/* Person at desk */}
      <div className={`px-sprite${consequence ? ' panic' : ''}`} style={{ left: 64, bottom: 64 }}>
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-blue'} />
        <div className="px-legs-still" />
      </div>

      {/* Speech bubble */}
      <div className="sc-bubble" style={{ right: 40, bottom: 180 }}>
        {consequence
          ? (en ? '💀 Remote access active' : '💀 Acceso remoto activo')
          : (en ? '"Microsoft Support.\nCritical virus detected."' : '"Soporte de Microsoft.\nDetecto virus crítico."')}
      </div>

      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ RAT INSTALLED — CREDENTIALS STOLEN' : '☠ RAT INSTALADO — CREDENCIALES ROBADAS'}
        </div>
      )}
    </>
  )
}

/* ── Scene 2: CEO fraud email ── */
function CeoFraudScene({ consequence, en }: { consequence: boolean; en: boolean }) {
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

      {/* Monitor with CEO email */}
      <div className="sc-monitor" style={{ bottom: 100, left: '50%', transform: 'translateX(-50%)' }}>
        <div className="sc-monitor-bezel">
          <div className={`sc-monitor-screen active${consequence ? ' hacked' : ''}`} style={{ width: 210, height: 150, padding: 8 }}>
            {!consequence ? (
              <>
                <div className="sc-screen-from">
                  {en ? 'From' : 'De'}: ceo@dynapr<span style={{ color: '#e74c3c', fontWeight: 'bold' }}>0</span>co.com
                  <span style={{ color: '#e74c3c', marginLeft: 4 }}>← spoofed</span>
                </div>
                <div className="sc-screen-subject">
                  {en ? 'CONFIDENTIAL — immediate action' : 'CONFIDENCIAL — acción inmediata'}
                </div>
                <div className="sc-screen-body">
                  {en
                    ? 'In board meeting. Buy $500 Amazon gift cards and send codes NOW. Confidential.'
                    : 'En reunión de directorio. Compra $500 en gift cards de Amazon y mándame los códigos YA. Confidencial.'}
                </div>
                <div style={{ fontSize: 7, color: '#7ee8ff', marginTop: 4 }}>
                  — Jon Bell, CEO Dynapro
                </div>
                <div className="sc-screen-warn">
                  ⚠ {en ? 'CEO Fraud — verify by phone' : 'CEO Fraud — verificar por teléfono'}
                </div>
              </>
            ) : (
              <div className="sc-hacked-screen">
                <div className="sc-skull">💸</div>
                <div className="sc-hacked-title">
                  {en ? 'USD 500 LOST' : 'USD 500 PERDIDOS'}
                </div>
                <div className="sc-hacked-line">
                  {en ? 'gift cards redeemed' : 'gift cards canjeadas'}
                </div>
                <div className="sc-hacked-line" style={{ color: '#ff4444' }}>
                  {en ? '● untraceable — irrecoverable' : '● irrastreable — irrecuperable'}
                </div>
                <div className="sc-hacked-line">
                  {en ? 'domain: dynapr0co.com' : 'dominio: dynapr0co.com'}
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
          {en ? '☠ CEO FRAUD SUCCESSFUL' : '☠ CEO FRAUD — DINERO PERDIDO'}
        </div>
      )}
    </>
  )
}

/* ── Scene 3: Pretexting in cafeteria ── */
function PretextingScene({ consequence, en }: { consequence: boolean; en: boolean }) {
  return (
    <>
      {consequence && <div className="sc-consequence-overlay" />}

      <div className="sc-ceiling">
        <div className="sc-light" />
        <div className="sc-light" />
      </div>
      <div className="sc-wall" />
      <div className="sc-floor" />

      {/* Cafeteria table */}
      <div className="sc-table" style={{ left: '50%', transform: 'translateX(-50%)', width: 180 }}>
        <div className="sc-table-top" />
        <div className="sc-table-leg-l" />
        <div className="sc-table-leg-r" />
      </div>

      {/* Two cups on table */}
      {[70, 120].map((x, i) => (
        <div key={i} style={{
          position: 'absolute', bottom: 60, left: `calc(50% - 80px + ${x}px)`,
          width: 12, height: 16, background: '#2a1a0a', border: '2px solid #3a2a1a',
          borderRadius: '0 0 3px 3px', zIndex: 5,
        }}>
          <div style={{ position: 'absolute', top: -4, left: -2, right: -2, height: 6, background: '#1a0a00', borderRadius: 3 }} />
        </div>
      ))}

      {/* Employee */}
      <div className={`px-sprite${consequence ? ' panic' : ''}`} style={{ left: '50%', transform: 'translateX(-100px)', bottom: 48 }}>
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-blue'} />
        <div className="px-legs-still" />
      </div>

      {/* Suspicious stranger — always suit */}
      <div className="px-sprite" style={{ left: '50%', transform: 'translateX(30px)', bottom: 48 }}>
        <div className="px-head" />
        <div className="px-body-suit" />
        <div className="px-legs-still" />
      </div>

      {/* Speech bubble */}
      <div className="sc-bubble" style={{ left: '50%', transform: 'translateX(20px)', bottom: 150 }}>
        {consequence
          ? (en ? '📧 Spear-phishing sent' : '📧 Spear-phishing enviado')
          : (en ? '"What ERP?\nWho manages IT?"' : '"¿Qué ERP usan?\n¿Quién maneja IT?"')}
      </div>

      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ DATA USED FOR TARGETED ATTACK' : '☠ DATOS USADOS PARA ATAQUE DIRIGIDO'}
        </div>
      )}
    </>
  )
}
