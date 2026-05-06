import { useGame } from '../engine/GameContext'
import { ProgressSync } from '../engine/ProgressSync'
import { LevelMap } from './LevelMap'
import { Game } from './Game'

export function GameRoot() {
  const { phase } = useGame()

  return (
    <ProgressSync>
      {phase === 'LEVEL_SELECT' ? <LevelMap /> : <Game />}
    </ProgressSync>
  )
}
