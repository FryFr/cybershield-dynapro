import { useTranslation } from 'react-i18next'
import { useGame } from '../../engine/GameContext'
import LEVELS from '../../engine/gameContent'

export function LevelComplete() {
  const { t } = useTranslation()
  const { phase, currentLevel, levelScore, currentLevelIndex, goToMap, startLevel } = useGame()

  if (phase !== 'LEVEL_COMPLETE' || !currentLevel) return null

  const nextLevelIndex = currentLevelIndex + 1
  const hasNextLevel = nextLevelIndex < LEVELS.length

  return (
    <div className="level-complete-overlay">
      <div className="level-complete-card">
        <div className="level-complete-icon">🏆</div>

        <div className="level-complete-title">{t('levelComplete.title')}</div>

        <div className="level-complete-stats">
          <div className="stat-item">
            <span className="stat-value">{levelScore.toLocaleString()}</span>
            <span className="stat-label">{t('levelComplete.score')}</span>
          </div>
        </div>

        <div className="level-complete-actions">
          {hasNextLevel && (
            <button
              className="level-complete-btn primary"
              onClick={() => startLevel(nextLevelIndex)}
            >
              {t('levelComplete.next')}
            </button>
          )}
          <button className="level-complete-btn secondary" onClick={goToMap}>
            {t('levelComplete.map')}
          </button>
        </div>
      </div>
    </div>
  )
}
