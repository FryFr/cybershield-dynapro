import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TopBar } from '../components/ui/TopBar'
import { NarrativePanel } from '../components/ui/NarrativePanel'
import { FeedbackModal } from '../components/ui/FeedbackModal'
import { LevelComplete } from '../components/ui/LevelComplete'
import { GameComplete } from '../components/ui/GameComplete'
import { SceneRenderer } from '../components/scenes'
import { useGame } from '../engine/GameContext'
import { useAuth } from '../hooks/useAuth'
import { audioEngine } from '../engine/AudioEngine'

export function Game() {
  const { currentLevel, phase, goToMap } = useGame()
  const { user, profile } = useAuth()
  const { t } = useTranslation()

  useEffect(() => {
    audioEngine.startBgm()
    return () => audioEngine.stopBgm()
  }, [])

  if (phase === 'LEVEL_SELECT') return null

  const userName = profile?.full_name ?? user?.email ?? 'Empleado Dynapro'

  return (
    <div className="game-page">
      <TopBar onGoHome={goToMap} />

      <div className="game-content">
        <div className="scene-panel">
          {currentLevel && <SceneRenderer levelId={currentLevel.id} />}
        </div>

        <NarrativePanel />
      </div>

      <div className="statusbar">
        <div className="status-dot" />
        <span>{t('statusBar.active')}</span>
        <div className="status-spacer" />
        <span>{t('statusBar.version')}</span>
        <div className="status-spacer" />
        <span>{t('statusBar.employee')}: {userName}</span>
      </div>

      <FeedbackModal />
      <LevelComplete />
      <GameComplete />
    </div>
  )
}
