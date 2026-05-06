import { useState, useEffect, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { useGame } from '../../engine/GameContext'

export function PhysicalScene() {
  const { currentSceneIndex, phase } = useGame()
  const { i18n } = useTranslation()
  const isConsequence = phase === 'CONSEQUENCE'
  const en = i18n.language === 'en'
  return (
    <div className="pixel-scene">
      {currentSceneIndex === 0 && <TailgatingScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 1 && <ReceptionScene consequence={isConsequence} en={en} />}
      {currentSceneIndex === 2 && <PrinterScene consequence={isConsequence} en={en} />}
    </div>
  )
}

/* ── Scene 1: Tailgating — security door + walking stranger ── */
function TailgatingScene({ consequence, en }: { consequence: boolean; en: boolean }) {
  return (
    <>
      {consequence && <div className="sc-consequence-overlay" />}

      <div className="sc-ceiling">
        <div className="sc-light" />
        <div className="sc-light dim" />
      </div>
      <div className="sc-wall" />
      <div className="sc-floor" />

      {/* Camera top-right */}
      <div className="sc-camera sc-camera-r" />
      <div className="sc-cam-sweep sc-cam-sweep-r">
        <div className="sc-cam-ray" />
      </div>

      {/* Security door */}
      <div className={`sc-door sc-door-r${consequence ? ' hacked' : ''}`}>
        <div className="sc-door-window" />
        <div className="sc-door-handle" />
      </div>

      {/* Keypad */}
      <div className="sc-keypad sc-keypad-r" style={{ bottom: 230 }}>
        <div className={`sc-keypad-screen${consequence ? ' green' : ''}`} />
        <div className="sc-keypad-row">
          <div className="sc-keypad-btn" /><div className="sc-keypad-btn" /><div className="sc-keypad-btn" />
        </div>
        <div className="sc-keypad-row">
          <div className="sc-keypad-btn" /><div className="sc-keypad-btn" /><div className="sc-keypad-btn" />
        </div>
        <div className="sc-keypad-row">
          <div className="sc-keypad-btn" /><div className="sc-keypad-btn" /><div className="sc-keypad-btn" />
        </div>
      </div>

      {/* Walking character (employee) */}
      <div className={`px-sprite px-walk-in${consequence ? ' panic' : ''}`}>
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-blue'} />
        <div className="px-legs" />
      </div>

      {/* Stranger — in consequence becomes "attacker inside" */}
      <div
        className={`px-sprite${consequence ? ' panic' : ''}`}
        style={{ right: 148, bottom: 48 }}
      >
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-gray'} />
        <div className="px-legs-still" />
      </div>

      {!consequence ? (
        <>
          <div className="sc-bubble" style={{ right: 155, bottom: 140 }}>
            {en ? '"I\'m from IT, let me in"' : '"Soy de IT, dejame entrar"'}
          </div>
          <div style={{
            position: 'absolute', right: 156, bottom: 120,
            fontSize: 16, zIndex: 8,
            animation: 'sc-blink 1.2s step-end infinite',
          }}>🚫</div>
        </>
      ) : (
        <>
          <div className="sc-bubble" style={{ right: 155, bottom: 140 }}>
            {en ? '💀 Installing device...' : '💀 Instalando dispositivo...'}
          </div>
          <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, right: 16 }}>
            {en ? '☠ INTRUDER INSIDE' : '☠ INTRUSO ADENTRO'}
          </div>
        </>
      )}
    </>
  )
}

/* ── Scene 2: Reception — unregistered visitor ── */
function ReceptionScene({ consequence, en }: { consequence: boolean; en: boolean }) {
  return (
    <>
      {consequence && <div className="sc-consequence-overlay" />}

      <div className="sc-ceiling">
        <div className="sc-light" />
        <div className="sc-light" />
      </div>
      <div className="sc-wall" />
      <div className="sc-floor" />

      {/* Reception counter */}
      <div className="sc-counter" style={{ left: '50%', transform: 'translateX(-50%)', width: 160 }}>
        <div className="sc-counter-top" />
        <div className="sc-counter-front">
          <div className="sc-counter-sign">{en ? 'RECEPTION' : 'RECEPCIÓN'}</div>
        </div>
      </div>

      {/* Small monitor on counter */}
      <div className="sc-monitor" style={{ bottom: 120, left: '50%', transform: 'translateX(-50%)' }}>
        <div className="sc-monitor-bezel">
          <div className={`sc-monitor-screen active${consequence ? ' hacked' : ''}`} style={{ width: 56, height: 36, padding: 4 }}>
            {consequence ? (
              <div style={{ fontSize: 5, color: '#ff4444', textAlign: 'center', marginTop: 4 }}>
                ☠ BREACH
              </div>
            ) : (
              <>
                <div className="sc-screen-row" style={{ width: '90%' }} />
                <div className="sc-screen-row" style={{ width: '70%' }} />
                <div className="sc-screen-row" style={{ width: '80%' }} />
              </>
            )}
          </div>
        </div>
        <div className="sc-monitor-neck" />
        <div className="sc-monitor-base" style={{ width: 70 }} />
      </div>

      {/* Receptionist */}
      <div className={`px-sprite${consequence ? ' panic' : ''}`} style={{ left: 130, bottom: 116 }}>
        <div className="px-head" />
        <div className={consequence ? 'px-body-red' : 'px-body-blue'} />
        <div className="px-legs-still" />
      </div>

      {/* Visitor */}
      <div className="px-sprite" style={{ right: 100, bottom: 48 }}>
        <div className="px-head" />
        <div className="px-body-suit" />
        <div className="px-legs-still" />
      </div>

      <div className="sc-bubble" style={{ right: 95, bottom: 140 }}>
        {consequence
          ? (en ? '💀 Device planted' : '💀 Dispositivo instalado')
          : (en ? '"Here to check\nthe servers"' : '"Vengo a revisar\nlos servidores"')}
      </div>
      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ SERVER ROOM COMPROMISED' : '☠ CUARTO DE SERVIDORES COMPROMETIDO'}
        </div>
      )}
    </>
  )
}

/* ── Scene 3: Printer — sensitive document unattended ── */
function PrinterScene({ consequence, en }: { consequence: boolean; en: boolean }) {
  const [animPhase, setAnimPhase] = useState(0)

  useEffect(() => {
    if (consequence) return
    const durations = [2500, 2500, 1500, 2500]
    const t = setTimeout(() => setAnimPhase(p => (p + 1) % 4), durations[animPhase])
    return () => clearTimeout(t)
  }, [animPhase, consequence])

  const isWalking = animPhase === 0 || animPhase === 3
  const showBubble = animPhase === 1

  const charStyle: CSSProperties =
    animPhase === 0 ? { left: '-80px', animation: 'printer-walk-in 2.5s linear forwards' } :
    animPhase === 3 ? { left: '28%',   animation: 'printer-walk-out 2.5s linear forwards' } :
                     { left: '28%' }

  return (
    <>
      {consequence && <div className="sc-consequence-overlay" />}

      <div className="sc-ceiling">
        <div className="sc-light" />
        <div className="sc-light dim" />
      </div>
      <div className="sc-wall" />
      <div className="sc-floor" />

      {/* Camera */}
      <div className="sc-camera sc-camera-l" />
      <div className="sc-cam-sweep sc-cam-sweep-l">
        <div className="sc-cam-ray" />
      </div>

      {/* Printer */}
      <div className="sc-printer" style={{ bottom: 90, left: '50%', transform: 'translateX(-50%)' }}>
        <div className="sc-printer-body">
          <div className="sc-printer-slot" />
          <div className={`sc-printer-led${consequence ? ' red' : ''}`} />
        </div>
        <div className="sc-paper">
          <div className="sc-paper-line" style={{ width: '85%' }} />
          <div className="sc-paper-sensitive">
            {en ? 'SALARIES · IDs · CONFIDENTIAL' : 'SUELDOS · IDs · CONFIDENCIAL'}
          </div>
          <div className="sc-paper-line" style={{ width: '65%' }} />
          <div className="sc-paper-line" style={{ width: '75%' }} />
          <div className="sc-paper-line" style={{ width: '50%' }} />
        </div>
      </div>

      {/* Animated or static character */}
      {!consequence ? (
        <div className="px-sprite" style={{ bottom: 48, ...charStyle }}>
          <div className="px-head" />
          <div className="px-body-blue" />
          {isWalking ? <div className="px-legs" /> : <div className="px-legs-still" />}
        </div>
      ) : (
        /* In consequence: stranger picks up the document */
        <div className="px-sprite panic" style={{ bottom: 48, right: 80 }}>
          <div className="px-head" />
          <div className="px-body-gray" />
          <div className="px-legs-still" />
        </div>
      )}

      {!consequence && showBubble && (
        <div className="sc-bubble" style={{ left: '16%', bottom: 155 }}>
          {en ? '"Is this someone\'s?"' : '"¿Es de alguien esto?"'}
        </div>
      )}

      {consequence && (
        <div className="sc-bubble" style={{ right: 68, bottom: 140 }}>
          {en ? '📸 Photographing...' : '📸 Fotografiando...'}
        </div>
      )}

      {consequence && (
        <div className="sc-tag sc-tag-red sc-tag-blink" style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {en ? '☠ DATA LEAK — SALARIES EXPOSED' : '☠ FILTRACIÓN — SUELDOS EXPUESTOS'}
        </div>
      )}
    </>
  )
}
