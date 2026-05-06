import { useTranslation } from 'react-i18next'
import { useGame } from '../../engine/GameContext'

export function UsbScene() {
  const { currentSceneIndex, phase } = useGame()
  const { i18n } = useTranslation()
  const isConsequence = phase === 'CONSEQUENCE'
  const en = i18n.language === 'en'
  return (
    <div className="pixel-scene">
      {currentSceneIndex === 0 && <ChargingPhoneScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 1 && <UnknownUsbScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 2 && <CopyFilesScene consequence={isConsequence} en={en} />}
    </div>
  )
}

/* ── Scene 1: Visitor charging phone via PC USB ── */
function ChargingPhoneScene({ consequence, en }: { consequence: boolean; en: boolean }) {
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

      {/* PC Tower */}
      <div className="sc-tower" style={{ bottom: 64, left: 80, width: 44, height: 80 }}>
        <div className="sc-tower-light" />
        <div className="sc-tower-usb" />
        {/* Cable */}
        <div style={{
          position: 'absolute', bottom: 18, left: 20, width: 2, height: 60,
          background: 'repeating-linear-gradient(180deg, #1a3a6a 0px, #1a3a6a 4px, #2a5a9a 4px, #2a5a9a 8px)',
          zIndex: 5,
        }} />
      </div>

      {/* Phone */}
      <div className="sc-phone" style={{ bottom: 48, left: 95 }}>
        <div className="sc-phone-speaker" />
        <div className={`sc-phone-screen${consequence ? ' hacked' : ''}`} style={{ width: 70, height: 80, padding: 5 }}>
          {!consequence ? (
            <>
              <div style={{ fontSize: 8, color: '#7ee8ff', textAlign: 'center', marginBottom: 4 }}>
                🔋 {en ? 'Charging' : 'Cargando'}
              </div>
              <div style={{ height: 4, background: '#0a1020', border: '1px solid #1a3040', marginBottom: 3 }}>
                <div style={{ height: '100%', width: '65%', background: '#2ecc71' }} />
              </div>
              <div style={{ fontSize: 6, color: '#3a5a3a', textAlign: 'center' }}>65%</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 6, color: '#e74c3c', textAlign: 'center', marginBottom: 3 }}>
                💀 {en ? 'DATA TRANSFER' : 'TRANSFERENCIA'}
              </div>
              <div style={{ fontSize: 5, color: '#ff6666' }}>
                {en ? '● credentials...' : '● credenciales...'}
              </div>
              <div style={{ fontSize: 5, color: '#ff6666' }}>
                {en ? '● contacts...' : '● contactos...'}
              </div>
              <div style={{ fontSize: 5, color: '#ff4444', animation: 'sc-blink 0.6s step-end infinite' }}>
                47s
              </div>
            </>
          )}
        </div>
        <div className="sc-phone-btn" />
      </div>

      {/* Visitor */}
      <div className="px-sprite" style={{ left: 170, bottom: 48 }}>
        <div className="px-head" />
        <div className="px-body-suit" />
        <div className="px-legs-still" />
      </div>

      {/* Employee */}
      <div className={`px-sprite${consequence ? ' panic' : ''}`} style={{ right: 80, bottom: 64 }}>
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-blue'} />
        <div className="px-legs-still" />
      </div>

      {/* Warning */}
      <div style={{
        position: 'absolute', left: 64, bottom: 130, zIndex: 8,
        fontSize: 7, color: '#e74c3c', fontFamily: 'Courier New', letterSpacing: 1,
        animation: 'sc-blink 0.8s step-end infinite',
        background: 'rgba(20,0,0,0.8)', border: '1px solid #e74c3c', padding: '2px 6px',
      }}>
        {en ? 'ACTIVE USB TRANSFER' : 'TRANSFERENCIA USB ACTIVA'}
      </div>

      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ DATA EXFILTRATED IN 47 SECONDS' : '☠ DATOS EXFILTRADOS EN 47 SEGUNDOS'}
        </div>
      )}
    </>
  )
}

/* ── Scene 2: Unknown USB plugged in PC ── */
function UnknownUsbScene({ consequence, en }: { consequence: boolean; en: boolean }) {
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

      {/* PC Tower with unknown USB */}
      <div className="sc-tower" style={{ bottom: 64, left: 80, width: 44, height: 80 }}>
        <div className={`sc-tower-light${consequence ? ' red' : ''}`} />
        <div style={{ position: 'absolute', bottom: 18, left: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 16, height: 8, background: '#1a3a6a', border: '2px solid #2a5a9a', borderRadius: 1 }} />
          <div style={{ width: 8, height: 5, background: '#3a6ab0', border: '1px solid #4a7ac0' }} />
          <div style={{
            position: 'absolute', top: 2, right: 2, width: 4, height: 4, borderRadius: '50%',
            background: '#e74c3c', boxShadow: '0 0 4px rgba(231,76,60,0.8)',
            animation: 'sc-blink 0.5s step-end infinite',
          }} />
        </div>
      </div>

      {/* Monitor */}
      <div className="sc-monitor" style={{ bottom: 100, right: 80 }}>
        <div className="sc-monitor-bezel">
          <div className={`sc-monitor-screen active${consequence ? ' hacked' : ''}`} style={{ width: 130, height: 90, padding: 6 }}>
            {!consequence ? (
              <>
                <div style={{ fontSize: 7, color: '#f39c12', marginBottom: 4 }}>
                  📀 {en ? 'Device detected' : 'Dispositivo detectado'}
                </div>
                <div className="sc-screen-row" style={{ width: '80%' }} />
                <div className="sc-screen-row" style={{ width: '60%' }} />
                <div style={{ fontSize: 6, color: '#e74c3c', marginTop: 4 }}>
                  {en ? 'Autorun? ⚠' : '¿Autoejecutar? ⚠'}
                </div>
              </>
            ) : (
              <div className="sc-hacked-screen" style={{ fontSize: 6 }}>
                <div className="sc-skull" style={{ fontSize: 10 }}>💀</div>
                <div className="sc-hacked-title" style={{ fontSize: 6 }}>MALWARE ACTIVE</div>
                <div className="sc-hacked-line">{en ? 'scanning network...' : 'escaneando red...'}</div>
                <div className="sc-hacked-line" style={{ color: '#ff4444' }}>
                  {en ? '● outbound connection' : '● conexión saliente'}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="sc-monitor-neck" />
        <div className="sc-monitor-base" style={{ width: 160 }} />
      </div>

      {consequence && (
        <>
          <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 56, left: '50%', transform: 'translateX(-50%)' }}>
            {en ? '☠ NETWORK SCAN ACTIVE' : '☠ ESCANEO DE RED ACTIVO'}
          </div>
          <div className="sc-tag sc-tag-orange" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
            {en ? 'ALL NETWORK DISCONNECTED' : 'RED COMPLETA DESCONECTADA'}
          </div>
        </>
      )}
    </>
  )
}

/* ── Scene 3: Copying corporate files to personal USB ── */
function CopyFilesScene({ consequence, en }: { consequence: boolean; en: boolean }) {
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

      {/* PC Tower */}
      <div className="sc-tower" style={{ bottom: 64, left: 80, width: 44, height: 80 }}>
        <div className="sc-tower-light" />
        <div className="sc-tower-usb" />
      </div>

      {/* Monitor */}
      <div className="sc-monitor" style={{ bottom: 100, left: '50%', transform: 'translateX(-20px)' }}>
        <div className="sc-monitor-bezel">
          <div className={`sc-monitor-screen active${consequence ? ' hacked' : ''}`} style={{ width: 160, height: 110, padding: 8 }}>
            {!consequence ? (
              <>
                <div style={{ fontSize: 8, color: '#7ee8ff', marginBottom: 6 }}>
                  📁 → 💾 {en ? 'Copying files...' : 'Copiando archivos...'}
                </div>
                <div style={{ height: 8, background: '#0a1020', border: '1px solid #1a3040', marginBottom: 4 }}>
                  <div style={{ height: '100%', width: '45%', background: '#1a4080', animation: 'progressglow 1s ease-in-out infinite' }} />
                </div>
                <div style={{ fontSize: 6, color: '#6090a0' }}>clientes_datos.xlsx</div>
                <div style={{ fontSize: 6, color: '#6090a0' }}>contratos_2025.pdf</div>
                <div style={{ fontSize: 6, color: '#6090a0' }}>presupuestos_Q1.xlsx</div>
                <div style={{ fontSize: 6, color: '#e74c3c', marginTop: 4 }}>
                  → {en ? 'Personal USB (F:)' : 'USB personal (F:)'}
                </div>
              </>
            ) : (
              <div className="sc-hacked-screen" style={{ fontSize: 6 }}>
                <div className="sc-skull">🔓</div>
                <div className="sc-hacked-title" style={{ fontSize: 6 }}>
                  {en ? 'USB LOST' : 'USB PERDIDO'}
                </div>
                <div className="sc-hacked-line">
                  {en ? 'client data: exposed' : 'datos cliente: expuestos'}
                </div>
                <div className="sc-hacked-line" style={{ color: '#ff4444' }}>
                  {en ? 'PIPEDA breach notice' : 'notificación PIPEDA'}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="sc-monitor-neck" />
        <div className="sc-monitor-base" style={{ width: 190 }} />
      </div>

      {/* USB plugged in */}
      <div className="sc-usb" style={{ bottom: 76, left: 96, transform: 'rotate(-90deg)' }}>
        <div className="sc-usb-body"><div className="sc-usb-led" /></div>
        <div className="sc-usb-tip" />
      </div>

      <div className={`px-sprite${consequence ? ' panic' : ''}`} style={{ right: 80, bottom: 64 }}>
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-blue'} />
        <div className="px-legs-still" />
      </div>

      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ CLIENT DATA BREACH — PIPEDA' : '☠ BRECHA DE DATOS — OBLIGACIÓN PIPEDA'}
        </div>
      )}
    </>
  )
}
