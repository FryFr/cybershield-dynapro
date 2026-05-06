import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useGame } from '../../engine/GameContext'
import { audioEngine } from '../../engine/AudioEngine'

export function NarrativePanel() {
  const { t } = useTranslation()
  const { currentScene, currentLevel, currentSceneIndex, makeChoice, retryScene, phase, lives } = useGame()

  useEffect(() => {
    if (phase === 'SCENE') audioEngine.playEffect('sceneEnter')
  }, [currentSceneIndex, phase])

  if (!currentScene || !currentLevel) return null

  const sceneNum = String(currentSceneIndex + 1).padStart(2, '0')

  if (phase === 'CONSEQUENCE' && currentScene.consequence) {
    const c = currentScene.consequence
    const noLivesLeft = lives === 0
    return (
      <div className="narrative-panel consequence-panel">
        <div className="scenario-tag scenario-tag-danger">
          ☠ {t('scene.consequence')} — {currentLevel.title}
        </div>

        <div className="consequence-description">
          {c.description}
        </div>

        <div className="consequence-impact">
          <div className="consequence-impact-label">{t('scene.whySerious')}</div>
          {c.impact}
        </div>

        <div className="consequence-concept">
          <div className="consequence-concept-title">{c.conceptTitle}</div>
          <div className="consequence-concept-body">{c.conceptExplanation}</div>
        </div>

        <div className="consequence-what-todo">
          <span className="consequence-what-todo-label">{t('scene.correctMove')} </span>
          {c.whatToDo}
        </div>

        <button
          className="consequence-retry-btn"
          onClick={() => { audioEngine.playEffect('click'); retryScene() }}
        >
          {noLivesLeft
            ? `↺ ${t('scene.retryNoLives')}`
            : `↺ ${t('scene.retry')} — ${t('scene.retryLives', { count: lives })}`}
        </button>
      </div>
    )
  }

  return (
    <div className="narrative-panel">
      <div className="scenario-tag">
        ⚠ {t('scene.scenario', 'Escenario')} {sceneNum} — {currentLevel.title}
      </div>

      <p className="narrative-text">{currentScene.narrative}</p>

      <div className="choices-label">{t('scene.whatDo')}</div>

      <div className="choices-list">
        {currentScene.choices.map((choice) => (
          <button
            key={choice.key}
            className="choice-btn"
            onMouseEnter={() => audioEngine.playEffect('hover')}
            onClick={() => { audioEngine.playEffect('click'); makeChoice(choice) }}
          >
            <span className="choice-key">{choice.key.toUpperCase()}</span>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  )
}
