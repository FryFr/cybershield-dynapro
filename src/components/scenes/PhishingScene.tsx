import { useTranslation } from 'react-i18next'
import { useGame } from '../../engine/GameContext'

export function PhishingScene() {
  const { currentSceneIndex, phase } = useGame()
  const { i18n } = useTranslation()
  const isConsequence = phase === 'CONSEQUENCE'
  const en = i18n.language === 'en'
  return (
    <div className="pixel-scene">
      {currentSceneIndex === 0 && <EmailScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 1 && <WhatsAppScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 2 && <AttachmentScene consequence={isConsequence} en={en} />}
    </div>
  )
}

/* ── Scene 1: Suspicious email on PC ── */
function EmailScene({ consequence, en }: { consequence: boolean; en: boolean }) {
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

      {/* Desk */}
      <div className="sc-desk" style={{ left: 60, right: 60 }}>
        <div className="sc-desk-top" />
        <div className="sc-desk-side sc-desk-side-l" />
        <div className="sc-desk-side sc-desk-side-r" />
      </div>

      {/* Monitor */}
      <div className="sc-monitor" style={{ bottom: 100, left: '50%', transform: 'translateX(-50%)' }}>
        <div className="sc-monitor-bezel">
          <div
            className={`sc-monitor-screen active${consequence ? ' hacked' : ''}`}
            style={{ width: 210, height: 150, padding: 8 }}
          >
            {!consequence ? (
              <>
                <div style={{ fontSize: 7, color: '#3a5a6a', marginBottom: 4, borderBottom: '1px solid #0d2030', paddingBottom: 3 }}>
                  ✉ {en ? 'INBOX' : 'BANDEJA DE ENTRADA'}
                </div>
                <div className="sc-screen-from">
                  {en ? 'From' : 'De'}: support@dynapr<span style={{ color: '#e74c3c', fontWeight: 'bold' }}>0</span>.com
                </div>
                <div className="sc-screen-subject">
                  ⚠ {en ? 'URGENT: Account to be suspended in 24h' : 'URGENTE: Cuenta a suspender en 24hs'}
                </div>
                <div className="sc-screen-body">
                  {en
                    ? 'You must verify your account immediately or it will be suspended. Click the link below.'
                    : 'Debe verificar su cuenta inmediatamente o será suspendida. Haga clic en el enlace a continuación.'}
                </div>
                <div className="sc-screen-link">
                  → {en ? 'Click here to verify now' : 'Clic aquí para verificar ahora'}
                </div>
                <div className="sc-screen-warn">
                  ⚠ {en ? 'suspicious domain: 0 ≠ o' : 'dominio sospechoso: 0 ≠ o'}
                </div>
              </>
            ) : (
              <div className="sc-hacked-screen">
                <div className="sc-skull">💀</div>
                <div className="sc-hacked-title">ACCESO COMPROMETIDO</div>
                <div className="sc-hacked-line">credenciales robadas</div>
                <div className="sc-hacked-line" style={{ color: '#ff4444' }}>● transmitiendo datos...</div>
                <div className="sc-hacked-line">usuario: dynapro\{'{'}tuusuario{'}'}</div>
                <div className="sc-hacked-line">destino: 185.220.x.x</div>
              </div>
            )}
          </div>
        </div>
        <div className="sc-monitor-neck" />
        <div className="sc-monitor-base" style={{ width: 240 }} />
      </div>

      {/* Keyboard */}
      <div className="sc-keyboard" style={{ bottom: 66, left: 100, width: 130 }} />

      {/* Person at desk */}
      <div className={`px-sprite${consequence ? ' panic' : ''}`} style={{ left: 64, bottom: 64 }}>
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-blue'} />
        <div className="px-legs-still" />
      </div>

      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, right: 16 }}>
          {en ? '☠ CREDENTIALS STOLEN' : '☠ CREDENCIALES ROBADAS'}
        </div>
      )}
    </>
  )
}

/* ── Scene 2: Suspicious WhatsApp message ── */
function WhatsAppScene({ consequence, en }: { consequence: boolean; en: boolean }) {
  return (
    <>
      {consequence && <div className="sc-consequence-overlay" />}

      <div className="sc-ceiling">
        <div className="sc-light" />
        <div className="sc-light" />
      </div>
      <div className="sc-wall" />
      <div className="sc-floor" />

      {/* Person holding phone */}
      <div
        className={`px-sprite px-walk-bob${consequence ? ' panic' : ''}`}
        style={{ left: '50%', transform: 'translateX(-60px)', bottom: 48 }}
      >
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-blue'} />
        <div className="px-legs-still" />
      </div>

      {/* Phone */}
      <div className="sc-phone" style={{ bottom: 110, left: '50%', transform: 'translateX(10px)' }}>
        <div className="sc-phone-speaker" />
        <div className={`sc-phone-screen${consequence ? ' hacked' : ''}`} style={{ width: 130, padding: 8 }}>
          {!consequence ? (
            <>
              <div className="sc-chat-header">💬 Pablo R.</div>
              <div className="sc-chat-bubble">
                Urgente! Hacé clic acá para asegurar tu cuenta:
                <span className="sc-chat-link">bit.ly/3xK9pQ ⚠</span>
              </div>
              <div className="sc-chat-time">hace 2 min</div>
              <div className="sc-chat-bubble" style={{ marginTop: 4, background: '#0a1a28' }}>
                es muy importante NO lo ignores
              </div>
            </>
          ) : (
            <>
              <div className="sc-chat-header" style={{ color: '#e74c3c' }}>⚠ CUENTA HACKEADA</div>
              <div className="sc-chat-bubble" style={{ background: '#2a0000', color: '#ff6b6b' }}>
                💀 spyware instalado
              </div>
              <div className="sc-hacked-line" style={{ fontSize: 7, marginTop: 4 }}>accediendo contactos...</div>
              <div className="sc-hacked-line" style={{ fontSize: 7 }}>● exfiltrando chats...</div>
            </>
          )}
        </div>
        <div className="sc-phone-btn" />
      </div>

      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ SPYWARE INSTALLED' : '☠ SPYWARE INSTALADO'}
        </div>
      )}
    </>
  )
}

/* ── Scene 3: Email with .exe attachment ── */
function AttachmentScene({ consequence, en }: { consequence: boolean; en: boolean }) {
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

      {/* Desk */}
      <div className="sc-desk" style={{ left: 60, right: 60 }}>
        <div className="sc-desk-top" />
        <div className="sc-desk-side sc-desk-side-l" />
        <div className="sc-desk-side sc-desk-side-r" />
      </div>

      {/* Monitor with exe attachment */}
      <div className="sc-monitor" style={{ bottom: 100, left: '50%', transform: 'translateX(-50%)' }}>
        <div className="sc-monitor-bezel">
          <div
            className={`sc-monitor-screen active${consequence ? ' hacked' : ''}`}
            style={{ width: 210, height: 150, padding: 8 }}
          >
            {!consequence ? (
              <>
                <div className="sc-screen-from">
                  {en ? 'From' : 'De'}: {en ? 'billing@warman-suppliers.net' : 'facturacion@warman-proveedores.net'}
                </div>
                <div className="sc-screen-subject">
                  {en ? 'Invoice #INV-4521 — URGENT APPROVAL' : 'Factura #INV-4521 — APROBACIÓN URGENTE'}
                </div>
                <div className="sc-screen-body">
                  {en
                    ? 'Please review and approve the attached invoice before end of operations.'
                    : 'Por favor revise y apruebe la factura adjunta antes del cierre de operaciones.'}
                </div>
                <div className="sc-screen-attachment">
                  <span className="sc-screen-pdf">📎 {en ? 'invoice_URGENT.pdf' : 'factura_URGENTE.pdf'}</span>
                  <span className="sc-screen-exe">.exe</span>
                  <div style={{ fontSize: 6, color: '#4a5a6a', marginTop: 2 }}>42 KB</div>
                </div>
                <div className="sc-screen-warn">
                  ⚠ {en ? 'DOUBLE EXTENSION — disguised executable' : 'DOBLE EXTENSIÓN — ejecutable disfrazado'}
                </div>
              </>
            ) : (
              <div className="sc-hacked-screen">
                <div className="sc-skull">☠</div>
                <div className="sc-hacked-title">ARCHIVOS CIFRADOS</div>
                <div className="sc-hacked-line">cotizaciones.xlsx → .locked</div>
                <div className="sc-hacked-line">pedidos_2025.pdf → .locked</div>
                <div className="sc-hacked-line" style={{ color: '#ff4444' }}>
                  USD 25.000 — 47:52 restantes
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="sc-monitor-neck" />
        <div className="sc-monitor-base" style={{ width: 240 }} />
      </div>

      <div className="sc-keyboard" style={{ bottom: 66, left: 100, width: 130 }} />

      {/* Person */}
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
