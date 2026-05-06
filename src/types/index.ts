export interface Profile {
  id: string
  full_name: string
  department: string | null
  is_admin: boolean
  preferred_lang: 'es' | 'en'
  created_at: string
}

export interface GameProgress {
  id: string
  user_id: string
  level_id: string
  score: number
  completed: boolean
  started_at: string | null
  completed_at: string | null
  time_spent_sec: number | null
}

export interface ChoicesLog {
  id: string
  user_id: string
  level_id: string
  scene_id: string
  choice_made: 'a' | 'b' | 'c'
  was_correct: boolean
  time_to_choose_sec: number | null
  created_at: string
}

export interface Certificate {
  id: string
  user_id: string
  issued_at: string
  final_score: number
  cert_token: string
  diploma_url: string | null
}

export type GamePhase =
  | 'MENU'
  | 'LEVEL_SELECT'
  | 'LEVEL_INTRO'
  | 'SCENE'
  | 'FEEDBACK'
  | 'CONSEQUENCE'
  | 'LEVEL_COMPLETE'
  | 'GAME_COMPLETE'

export interface Choice {
  key: 'a' | 'b' | 'c'
  text: string
  correct: boolean
}

export interface SceneConsequence {
  description: string
  impact: string
  whatToDo: string
  conceptTitle: string
  conceptExplanation: string
}

export interface Scene {
  id: string
  narrative: string
  choices: Choice[]
  feedback_correct: string
  feedback_incorrect: string
  consequence?: SceneConsequence
}

export interface Level {
  id: string
  title: string
  description: string
  icon: string
  scenes: Scene[]
}
