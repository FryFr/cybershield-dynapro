import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { GameProgress } from '../types'

export function useProgress(userId: string | undefined) {
  const [progress, setProgress] = useState<GameProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }
    fetchProgress()
  }, [userId])

  async function fetchProgress() {
    const { data } = await supabase
      .from('game_progress')
      .select('*')
      .eq('user_id', userId)

    setProgress(data ?? [])
    setLoading(false)
  }

  async function startLevel(levelId: string) {
    if (!userId) return
    await supabase.from('game_progress').upsert({
      user_id: userId,
      level_id: levelId,
      score: 0,
      completed: false,
      started_at: new Date().toISOString(),
    }, { onConflict: 'user_id,level_id' })
  }

  async function completeLevel(levelId: string, score: number, timeSpentSec: number) {
    if (!userId) return
    await supabase.from('game_progress').upsert({
      user_id: userId,
      level_id: levelId,
      score,
      completed: true,
      completed_at: new Date().toISOString(),
      time_spent_sec: timeSpentSec,
    }, { onConflict: 'user_id,level_id' })

    await fetchProgress()
  }

  async function logChoice(
    levelId: string,
    sceneId: string,
    choiceMade: 'a' | 'b' | 'c',
    wasCorrect: boolean,
    timeToChooseSec: number,
  ) {
    if (!userId) return
    await supabase.from('choices_log').insert({
      user_id: userId,
      level_id: levelId,
      scene_id: sceneId,
      choice_made: choiceMade,
      was_correct: wasCorrect,
      time_to_choose_sec: timeToChooseSec,
    })
  }

  function getLevelProgress(levelId: string) {
    return progress.find((p) => p.level_id === levelId) ?? null
  }

  const completedCount = progress.filter((p) => p.completed).length

  return {
    progress,
    loading,
    completedCount,
    getLevelProgress,
    startLevel,
    completeLevel,
    logChoice,
    refetch: fetchProgress,
  }
}
