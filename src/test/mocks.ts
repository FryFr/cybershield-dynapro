import { vi } from 'vitest'

export type GamePhase = 'SCENE' | 'CONSEQUENCE' | 'FEEDBACK' | 'LEVEL_COMPLETE' | 'GAME_COMPLETE'

export interface GameContextMock {
  currentSceneIndex: number
  phase: GamePhase
}

let _mock: GameContextMock = { currentSceneIndex: 0, phase: 'SCENE' }

export function setGameMock(values: Partial<GameContextMock>) {
  _mock = { ..._mock, ...values }
}

export function resetGameMock() {
  _mock = { currentSceneIndex: 0, phase: 'SCENE' }
}

vi.mock('../engine/GameContext', () => ({
  useGame: () => _mock,
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'es', changeLanguage: vi.fn() },
  }),
}))
