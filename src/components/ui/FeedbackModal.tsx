import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useGame } from '../../engine/GameContext'
import { audioEngine } from '../../engine/AudioEngine'

export function FeedbackModal() {
  const { t } = useTranslation()
  const { lastChoice, currentScene, nextScene, phase } = useGame()

  useEffect(() => {
    if (phase === 'FEEDBACK' && lastChoice) {
      audioEngine.playEffect(lastChoice.wasCorrect ? 'correct' : 'wrong')
    }
  }, [phase, lastChoice])

  if (phase !== 'FEEDBACK' || !lastChoice || !currentScene) return null

  const { wasCorrect } = lastChoice
  const feedbackText = wasCorrect
    ? currentScene.feedback_correct
    : currentScene.feedback_incorrect

  return (
    <div className="feedback-overlay">
      <div className={`feedback-modal ${wasCorrect ? 'correct' : 'incorrect'}`}>
        <div className={`feedback-result ${wasCorrect ? 'correct' : 'incorrect'}`}>
          {wasCorrect ? t('feedback.correct') : t('feedback.incorrect')}
        </div>

        <p className="feedback-text">{feedbackText}</p>

        <button className="feedback-continue-btn" onClick={nextScene}>
          {t('feedback.continue')}
        </button>
      </div>
    </div>
  )
}
