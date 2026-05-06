import { useEffect, useRef, type ReactNode } from 'react'
import { useGame } from './GameContext'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'

export function ProgressSync({ children }: { children: ReactNode }) {
  const { phase, currentLevel, currentScene, lastChoice, score, levelScore } = useGame()
  const { user } = useAuth()
  const { startLevel, completeLevel, logChoice } = useProgress(user?.id)

  const prevPhaseRef = useRef<string>('')
  const levelStartRef = useRef<number | null>(null)
  const sceneStartRef = useRef<number | null>(null)

  useEffect(() => {
    const prev = prevPhaseRef.current
    prevPhaseRef.current = phase

    if (!user || !currentLevel) return

    // Level started
    if (phase === 'SCENE' && prev !== 'SCENE' && prev !== 'FEEDBACK') {
      levelStartRef.current = Date.now()
      sceneStartRef.current = Date.now()
      startLevel(currentLevel.id)
    }

    // Scene appeared
    if (phase === 'SCENE' && prev === 'FEEDBACK') {
      sceneStartRef.current = Date.now()
    }

    // Choice made → log it
    if (phase === 'FEEDBACK' && lastChoice && currentScene) {
      const elapsed = sceneStartRef.current
        ? Math.round((Date.now() - sceneStartRef.current) / 1000)
        : 0
      logChoice(
        currentLevel.id,
        currentScene.id,
        lastChoice.choice.key,
        lastChoice.wasCorrect,
        elapsed,
      )
    }

    // Level completed
    if ((phase === 'LEVEL_COMPLETE' || phase === 'GAME_COMPLETE') && prev === 'FEEDBACK') {
      const elapsed = levelStartRef.current
        ? Math.round((Date.now() - levelStartRef.current) / 1000)
        : 0
      completeLevel(currentLevel.id, levelScore, elapsed)
      levelStartRef.current = null
    }
  }, [phase, currentLevel, currentScene, lastChoice, user, levelScore, score])

  return <>{children}</>
}
