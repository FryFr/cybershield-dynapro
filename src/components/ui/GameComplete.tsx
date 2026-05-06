import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useGame } from '../../engine/GameContext'
import { useAuth } from '../../hooks/useAuth'
import { useDiploma } from '../../hooks/useDiploma'
import { Diploma } from './Diploma'
import LEVELS from '../../engine/gameContent'

export function GameComplete() {
  const { t } = useTranslation()
  const { phase, score, goToMap } = useGame()
  const { user, profile } = useAuth()
  const { generating, error, result, generate, download } = useDiploma()
  const diplomaRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [certToken, setCertToken] = useState('')
  const issuedAt = new Date().toISOString()

  useEffect(() => {
    setCertToken(crypto.randomUUID())
  }, [])

  if (phase !== 'GAME_COMPLETE') return null

  const fullName = profile?.full_name ?? user?.email ?? 'Empleado Dynapro'
  const verifyUrl = `${window.location.origin}/verify/${result?.certToken ?? certToken}`

  async function handleGenerate() {
    if (!diplomaRef.current || !user) return
    await generate(diplomaRef.current, user.id, score)
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(verifyUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="game-complete-overlay">
      <div className="game-complete-inner">
        <div className="game-complete-header">
          <div className="gc-icon">🏆</div>
          <div className="gc-title">{t('gameComplete.title')}</div>
          <div className="gc-subtitle">{t('gameComplete.subtitle')}</div>
          <div className="gc-score">
            {score.toLocaleString()} pts · {LEVELS.length}/{LEVELS.length} niveles
          </div>
        </div>

        <div className="diploma-preview-wrapper">
          <Diploma
            ref={diplomaRef}
            fullName={fullName}
            finalScore={score}
            completedLevels={LEVELS.length}
            issuedAt={issuedAt}
            certToken={result?.certToken ?? certToken}
          />
        </div>

        {error && (
          <div className="gc-error">⚠ {error}</div>
        )}

        <div className="gc-actions">
          {!result ? (
            <button
              className="gc-btn primary"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? 'Generando...' : t('gameComplete.diploma')}
            </button>
          ) : (
            <>
              <button
                className="gc-btn primary"
                onClick={() => download(result.url, fullName)}
              >
                ↓ {t('diploma.download')}
              </button>
              <button
                className="gc-btn secondary"
                onClick={handleCopyLink}
              >
                {copied ? '✓ Copiado!' : `🔗 ${t('diploma.copy_link')}`}
              </button>
            </>
          )}

          <button className="gc-btn ghost" onClick={goToMap}>
            {t('levelMap.title')}
          </button>
        </div>
      </div>
    </div>
  )
}
