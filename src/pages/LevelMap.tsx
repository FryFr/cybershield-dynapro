import { useTranslation } from 'react-i18next'
import { useGame } from '../engine/GameContext'
import { TopBar } from '../components/ui/TopBar'
import { useAuth } from '../hooks/useAuth'

export function LevelMap() {
  const { t } = useTranslation()
  const { levels, completedLevels, startLevel } = useGame()
  const { signOut } = useAuth()

  function getCardState(levelId: string, index: number) {
    if (completedLevels[levelId] !== undefined) return 'completed'
    const firstIncompleteIndex = levels.findIndex((l) => completedLevels[l.id] === undefined)
    if (index <= firstIncompleteIndex) return 'available'
    return 'locked'
  }

  return (
    <div className="level-map-page">
      <TopBar
        onGoHome={() => signOut()}
      />

      <div className="level-map-content">
        <div className="level-map-header">
          <div className="level-map-title">{t('levelMap.title')}</div>
          <div className="level-map-subtitle">{t('levelMap.subtitle')}</div>
        </div>

        <div className="level-grid">
          {levels.map((level, index) => {
            const state = getCardState(level.id, index)
            const score = completedLevels[level.id]

            return (
              <div
                key={level.id}
                className={`level-card ${state}`}
                onClick={() => state !== 'locked' && startLevel(index)}
              >
                <div className="level-card-number">0{index + 1}</div>
                <span className="level-card-icon">{level.icon}</span>
                <div className="level-card-title">{t(`levels.${level.id}.title`)}</div>
                <div className="level-card-desc">{t(`levels.${level.id}.description`)}</div>

                {state === 'completed' && score !== undefined && (
                  <div className="level-card-score">
                    {score.toLocaleString()} {t('levelMap.score')}
                  </div>
                )}

                {state !== 'locked' && (
                  <div className="level-card-btn">
                    {state === 'completed'
                      ? t('levelMap.replay')
                      : t('levelMap.start')}
                  </div>
                )}

                {state === 'locked' && (
                  <div style={{ fontSize: 9, color: 'var(--text-dim)', marginTop: 8 }}>
                    {t('levelMap.locked')}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
