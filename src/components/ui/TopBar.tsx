import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useGame } from '../../engine/GameContext'
import { audioEngine } from '../../engine/AudioEngine'
import LEVELS from '../../engine/gameContent'

interface TopBarProps {
  onGoHome?: () => void
}

export function TopBar({ onGoHome }: TopBarProps) {
  const { t, i18n } = useTranslation()
  const { score, lives, currentLevelIndex, completedLevels, phase } = useGame()
  const [muted, setMuted] = useState(false)
  const prevLives = useRef(lives)

  useEffect(() => {
    if (lives < prevLives.current) {
      audioEngine.playEffect('heartLoss')
    }
    prevLives.current = lives
  }, [lives])

  function toggleMute() {
    if (muted) {
      audioEngine.unmute()
      setMuted(false)
    } else {
      audioEngine.mute()
      setMuted(true)
    }
    audioEngine.playEffect('click')
  }

  const totalLevels = LEVELS.length
  const completedCount = Object.keys(completedLevels).length
  const progressPct = (completedCount / totalLevels) * 100

  const currentLevel = LEVELS[currentLevelIndex]
  const showLevel = phase === 'SCENE' || phase === 'FEEDBACK' || phase === 'LEVEL_COMPLETE'

  const progressLabel = showLevel && currentLevel
    ? `${t('topBar.progress')} — ${currentLevel.title}`
    : `${t('topBar.progress')} — ${completedCount}/${totalLevels} ${t('topBar.levels')}`

  return (
    <div className="topbar">
      <img
        src="/dynapro-logo.png"
        alt="Dynapro"
        className="topbar-logo"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />

      <span className="topbar-game-name">⬛ CYBERSHIELD</span>

      {showLevel && (
        <div className="topbar-lives" title={t('topBar.lives')}>
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} style={{ opacity: i < lives ? 1 : 0.18 }}>❤️</span>
          ))}
        </div>
      )}

      <div className="topbar-progress-wrap">
        <div className="topbar-progress-label">{progressLabel}</div>
        <div className="topbar-progress-wrapper">
          <div className="topbar-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <span className="topbar-score">{score.toLocaleString()} PTS</span>

      <div className="topbar-lang">
        {(['es', 'en'] as const).map((lang) => (
          <button
            key={lang}
            className={`topbar-lang-btn ${i18n.language === lang ? 'active' : ''}`}
            onClick={() => i18n.changeLanguage(lang)}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <button
        className={`topbar-mute-btn ${muted ? 'muted' : ''}`}
        onClick={toggleMute}
        title={muted ? 'Activar sonido' : 'Silenciar'}
      >
        {muted ? '🔇' : '🔊'}
      </button>

      {onGoHome && (
        <button className="topbar-home-btn" onClick={onGoHome}>
          {t('nav.home')}
        </button>
      )}
    </div>
  )
}
