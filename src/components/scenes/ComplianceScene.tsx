import { useTranslation } from 'react-i18next'
import { useGame } from '../../engine/GameContext'

export function ComplianceScene() {
  const { currentSceneIndex, phase } = useGame()
  const { i18n } = useTranslation()
  const isConsequence = phase === 'CONSEQUENCE'
  const en = i18n.language === 'en'
  return (
    <div className="pixel-scene">
      {currentSceneIndex === 0 && <SuspiciousClickScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 1 && <ClientDataScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 2 && <OldFilesScene consequence={isConsequence} en={en} />}
    </div>
  )
}

/* ── Scene 1: Accidental suspicious click — incident reporting ── */
function SuspiciousClickScene({ consequence, en }: { consequence: boolean; en: boolean }) {
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

      {/* Browser monitor */}
      <div className="sc-monitor" style={{ bottom: 100, left: '50%', transform: 'translateX(-50%)' }}>
        <div className="sc-monitor-bezel" style={{ boxShadow: consequence ? '0 0 20px rgba(231,76,60,0.3)' : '0 0 20px rgba(243,156,18,0.2)' }}>
          <div className={`sc-monitor-screen active${consequence ? ' hacked' : ''}`} style={{ width: 210, height: 150, padding: 6 }}>
            {!consequence ? (
              <>
                <div style={{ fontSize: 7, color: '#3a5a6a', marginBottom: 4, borderBottom: '1px solid #0d2030', paddingBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <span>🌐 {en ? 'browser' : 'navegador'}</span>
                  <span style={{ color: '#e74c3c' }}>⚠ {en ? 'ALERT' : 'ALERTA'}</span>
                </div>
                <div style={{ background: '#1a0a0a', border: '1px solid #e74c3c', padding: 6, textAlign: 'center', marginBottom: 4 }}>
                  <div style={{ fontSize: 9, color: '#e74c3c', fontWeight: 'bold', marginBottom: 2 }}>
                    ⚠ {en ? 'DANGEROUS SITE' : 'SITIO PELIGROSO'}
                  </div>
                  <div style={{ fontSize: 7, color: '#8a4a4a' }}>
                    {en ? 'This site may have installed malware' : 'Este sitio puede haber instalado malware'}
                  </div>
                </div>
                <div style={{ fontSize: 6, color: '#f39c12', animation: 'sc-blink 1s step-end infinite' }}>
                  {en ? 'Redirecting automatically...' : 'Redirigiendo automáticamente...'}
                </div>
                <div className="sc-screen-row" style={{ width: '70%', marginTop: 4 }} />
              </>
            ) : (
              <div className="sc-hacked-screen">
                <div className="sc-skull">💀</div>
                <div className="sc-hacked-title">
                  {en ? 'MALWARE ACTIVE' : 'MALWARE ACTIVO'}
                </div>
                <div className="sc-hacked-line">
                  {en ? '72h undetected' : '72h sin detectar'}
                </div>
                <div className="sc-hacked-line" style={{ color: '#ff4444' }}>
                  {en ? '● mapping network...' : '● mapeando red...'}
                </div>
                <div className="sc-hacked-line">
                  {en ? 'ERP creds: captured' : 'Creds ERP: capturadas'}
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

      <div className="sc-bubble" style={{ left: 90, bottom: 160 }}>
        {consequence
          ? (en ? '😱 Why didn\'t I report it?' : '😱 ¿Por qué no lo reporté?')
          : (en ? '"Uh... that wasn\'t good"' : '"Uh... eso no era bueno"')}
      </div>

      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ 72H EXPOSURE — FULL NETWORK AUDIT' : '☠ 72H DE EXPOSICIÓN — AUDITORÍA COMPLETA'}
        </div>
      )}
    </>
  )
}

/* ── Scene 2: Client asks for another client's data ── */
function ClientDataScene({ consequence, en }: { consequence: boolean; en: boolean }) {
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

      {/* Monitor showing client data */}
      <div className="sc-monitor" style={{ bottom: 100, right: 80 }}>
        <div className="sc-monitor-bezel">
          <div className={`sc-monitor-screen active${consequence ? ' hacked' : ''}`} style={{ width: 130, height: 90, padding: 6 }}>
            {!consequence ? (
              <>
                <div style={{ fontSize: 7, color: '#7ee8ff', marginBottom: 3 }}>
                  📋 {en ? 'CLIENT: Aceros Integrados' : 'CLIENTE: Aceros Integrados'}
                </div>
                <div style={{ fontSize: 6, color: '#5a7a8a' }}>
                  {en ? 'Contact: Juan García' : 'Contacto: Juan García'}
                </div>
                <div style={{ fontSize: 6, color: '#5a7a8a' }}>Tel: +52 55 ****-****</div>
                <div style={{ fontSize: 6, color: '#5a7a8a' }}>jg@acerosint.com</div>
                <div style={{ fontSize: 6, color: '#e74c3c', marginTop: 4 }}>
                  ⚠ {en ? 'CONFIDENTIAL DATA' : 'DATOS CONFIDENCIALES'}
                </div>
              </>
            ) : (
              <div className="sc-hacked-screen" style={{ fontSize: 6 }}>
                <div className="sc-skull" style={{ fontSize: 10 }}>💸</div>
                <div className="sc-hacked-title" style={{ fontSize: 6 }}>
                  {en ? 'DATA LEAKED' : 'DATOS FILTRADOS'}
                </div>
                <div className="sc-hacked-line">
                  {en ? 'competitor intel' : 'competidor informado'}
                </div>
                <div className="sc-hacked-line" style={{ color: '#ff4444' }}>
                  LFPDPPP {en ? 'violation' : 'violación'}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="sc-monitor-neck" />
        <div className="sc-monitor-base" style={{ width: 160 }} />
      </div>

      {/* Ringing phone */}
      <div style={{
        position: 'absolute', bottom: 74, left: 120, zIndex: 5,
        animation: consequence ? 'none' : 'px-bob 0.3s steps(2) infinite',
      }}>
        <div style={{ width: 40, height: 28, background: '#1a2030', border: `2px solid ${consequence ? '#e74c3c' : '#2a3040'}`, borderRadius: 3, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 4, left: 4, right: 4, height: 8, background: '#050d18', border: '1px solid #0a1a28', fontSize: 5, color: consequence ? '#e74c3c' : '#f39c12', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {consequence ? (en ? 'CLIENT FURIOUS' : 'CLIENTE FURIOSO') : (en ? 'CLIENT WAITING' : 'CLIENTE EN ESPERA')}
          </div>
          <div style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', fontSize: 9 }}>📞</div>
        </div>
      </div>

      <div className={`px-sprite${consequence ? ' panic' : ''}`} style={{ left: 64, bottom: 64 }}>
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-blue'} />
        <div className="px-legs-still" />
      </div>

      <div className="sc-bubble" style={{ left: 90, bottom: 160 }}>
        {consequence
          ? (en ? '😱 Competitor had our data!' : '😱 ¡El competidor tenía nuestros datos!')
          : (en ? '"Data on another\nclient? Verify first."' : '"¿Datos de otro\ncliente? Verificar."')}
      </div>

      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ CONFIDENTIALITY BREACH — LEGAL EXPOSURE' : '☠ BRECHA DE CONFIDENCIALIDAD — EXPOSICIÓN LEGAL'}
        </div>
      )}
    </>
  )
}

/* ── Scene 3: Old files with personal data in archive ── */
function OldFilesScene({ consequence, en }: { consequence: boolean; en: boolean }) {
  return (
    <>
      {consequence && <div className="sc-consequence-overlay" />}

      <div className="sc-ceiling">
        <div className="sc-light" />
        <div className="sc-light dim" />
      </div>
      <div className="sc-wall" />
      <div className="sc-floor" />

      {/* Filing cabinet */}
      <div className="sc-cabinet" style={{ bottom: 48, left: '50%', transform: 'translateX(-60px)', width: 100 }}>
        <div className="sc-drawer sc-drawer-open">
          <div className="sc-drawer-handle" />
          <div className="sc-file-tab">2012</div>
        </div>
        <div className="sc-drawer sc-drawer-open">
          <div className="sc-drawer-handle" />
          <div className="sc-file-tab" style={{ left: 20 }}>2014</div>
        </div>
        <div className="sc-drawer">
          <div className="sc-drawer-handle" />
        </div>
        <div className="sc-drawer">
          <div className="sc-drawer-handle" />
        </div>
      </div>

      {/* Files sticking out */}
      <div style={{ position: 'absolute', bottom: 128, left: '50%', transform: 'translateX(-65px)', zIndex: 5 }}>
        {[en ? 'SALARY\n2012' : 'SUELDO\n2012', en ? 'FILE\n2013' : 'LEGAJO\n2013', en ? 'SIN\n2014' : 'DNI\n2014'].map((label, i) => (
          <div key={i} style={{
            display: 'inline-block', marginRight: 4,
            width: 22, height: 30,
            background: consequence ? '#ff9900' : '#f0e080',
            border: `1px solid ${consequence ? '#cc7700' : '#c0b060'}`,
            fontSize: 5.5, color: '#2a1a00', padding: '2px 2px', verticalAlign: 'bottom',
            fontFamily: 'Courier New', fontWeight: 'bold',
            transform: `rotate(${(i - 1) * 6}deg)`,
            animation: consequence ? 'tag-blink 1.5s step-end infinite' : 'none',
          }}>
            {label.split('\n').map((l, j) => <div key={j}>{l}</div>)}
          </div>
        ))}
      </div>

      {/* Person — examining or panicking */}
      <div className={`px-sprite${consequence ? ' panic' : ''}`} style={{ right: 90, bottom: 48 }}>
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-blue'} />
        <div className="px-legs-still" />
      </div>

      {consequence && (
        <div className="sc-bubble" style={{ right: 78, bottom: 150 }}>
          {en ? '😱 47 people\nnotified...' : '😱 47 personas\na notificar...'}
        </div>
      )}

      {consequence && (
        <>
          <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 56, left: '50%', transform: 'translateX(-50%)' }}>
            {en ? '☠ PIPEDA BREACH — MANDATORY NOTIFICATION' : '☠ BRECHA PIPEDA — NOTIFICACIÓN OBLIGATORIA'}
          </div>
          <div className="sc-tag sc-tag-orange" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
            {en ? '3 WEEKS OF LEGAL WORK' : '3 SEMANAS DE TRABAJO LEGAL'}
          </div>
        </>
      )}
    </>
  )
}
