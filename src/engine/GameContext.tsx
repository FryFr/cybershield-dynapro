import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { GamePhase, Level, Scene, Choice } from '../types'
import LEVELS_ES, { LEVELS_EN } from './gameContent'

const INITIAL_LIVES = 3
const POINTS_CORRECT = 200
const POINTS_BONUS_FIRST_TRY = 100

interface GameState {
  phase: GamePhase
  currentLevelIndex: number
  currentSceneIndex: number
  lives: number
  score: number
  levelScore: number
  levelStartTime: number | null
  sceneStartTime: number | null
  completedLevels: Record<string, number>
  lastChoice: { choice: Choice; wasCorrect: boolean } | null
}

interface GameContextValue extends GameState {
  levels: Level[]
  currentLevel: Level | null
  currentScene: Scene | null
  goToLevelSelect: () => void
  startLevel: (levelIndex: number) => void
  makeChoice: (choice: Choice) => void
  retryScene: () => void
  nextScene: () => void
  goToMap: () => void
}

const GameContext = createContext<GameContextValue | null>(null)

const initialState: GameState = {
  phase: 'LEVEL_SELECT',
  currentLevelIndex: 0,
  currentSceneIndex: 0,
  lives: INITIAL_LIVES,
  score: 0,
  levelScore: 0,
  levelStartTime: null,
  sceneStartTime: null,
  completedLevels: {},
  lastChoice: null,
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(initialState)
  const { i18n } = useTranslation()

  const LEVELS = i18n.language === 'en' ? LEVELS_EN : LEVELS_ES
  const currentLevel = LEVELS[state.currentLevelIndex] ?? null
  const currentScene = currentLevel?.scenes[state.currentSceneIndex] ?? null

  const goToLevelSelect = useCallback(() => {
    setState((s) => ({ ...s, phase: 'LEVEL_SELECT' }))
  }, [])

  const startLevel = useCallback((levelIndex: number) => {
    setState((s) => ({
      ...s,
      phase: 'SCENE',
      currentLevelIndex: levelIndex,
      currentSceneIndex: 0,
      lives: INITIAL_LIVES,
      levelScore: 0,
      levelStartTime: Date.now(),
      sceneStartTime: Date.now(),
      lastChoice: null,
    }))
  }, [])

  const makeChoice = useCallback((choice: Choice) => {
    setState((s) => {
      const wasCorrect = choice.correct
      const sceneElapsed = s.sceneStartTime ? Math.round((Date.now() - s.sceneStartTime) / 1000) : 0
      const newLives = wasCorrect ? s.lives : Math.max(0, s.lives - 1)
      const pointsEarned = wasCorrect ? POINTS_CORRECT + (s.lives === INITIAL_LIVES ? POINTS_BONUS_FIRST_TRY : 0) : 0

      return {
        ...s,
        phase: wasCorrect ? 'FEEDBACK' : 'CONSEQUENCE',
        lives: newLives,
        score: s.score + pointsEarned,
        levelScore: s.levelScore + pointsEarned,
        lastChoice: { choice, wasCorrect },
        sceneStartTime: null,
        // sceneElapsed is available here but we'll handle DB writes in useProgress hook
        _sceneElapsed: sceneElapsed,
      } as GameState & { _sceneElapsed: number }
    })
  }, [])

  const retryScene = useCallback(() => {
    setState((s) => {
      if (s.lives === 0) {
        return {
          ...s,
          phase: 'SCENE',
          currentSceneIndex: 0,
          lives: INITIAL_LIVES,
          sceneStartTime: Date.now(),
          lastChoice: null,
        }
      }
      return {
        ...s,
        phase: 'SCENE',
        sceneStartTime: Date.now(),
        lastChoice: null,
      }
    })
  }, [])

  const nextScene = useCallback(() => {
    setState((s) => {
      if (!currentLevel) return s

      const isLastScene = s.currentSceneIndex >= currentLevel.scenes.length - 1

      if (!s.lastChoice?.wasCorrect && s.lives === 0) {
        return {
          ...s,
          phase: 'SCENE',
          currentSceneIndex: 0,
          lives: INITIAL_LIVES,
          sceneStartTime: Date.now(),
          lastChoice: null,
        }
      }

      if (isLastScene) {
        const levelElapsed = s.levelStartTime ? Math.round((Date.now() - s.levelStartTime) / 1000) : 0
        const newCompleted = { ...s.completedLevels, [currentLevel.id]: s.levelScore }
        const allDone = Object.keys(newCompleted).length === LEVELS.length

        return {
          ...s,
          phase: allDone ? 'GAME_COMPLETE' : 'LEVEL_COMPLETE',
          completedLevels: newCompleted,
          _levelElapsed: levelElapsed,
        } as GameState & { _levelElapsed: number }
      }

      return {
        ...s,
        phase: 'SCENE',
        currentSceneIndex: s.currentSceneIndex + 1,
        sceneStartTime: Date.now(),
        lastChoice: null,
      }
    })
  }, [currentLevel])

  const goToMap = useCallback(() => {
    setState((s) => ({ ...s, phase: 'LEVEL_SELECT' }))
  }, [])

  return (
    <GameContext.Provider
      value={{
        ...state,
        levels: LEVELS,
        currentLevel,
        currentScene,
        goToLevelSelect,
        startLevel,
        makeChoice,
        retryScene,
        nextScene,
        goToMap,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
