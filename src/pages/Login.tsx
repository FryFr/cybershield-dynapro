import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

const IS_DEV = import.meta.env.DEV

export function Login() {
  const { t, i18n } = useTranslation()
  const { user, loading, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [signingIn, setSigningIn] = useState(false)

  // Dev email form state
  const [devEmail, setDevEmail] = useState('')
  const [devPassword, setDevPassword] = useState('')
  const [devMode, setDevMode] = useState<'signin' | 'signup'>('signin')
  const [devError, setDevError] = useState('')
  const [devLoading, setDevLoading] = useState(false)

  const errorParam = searchParams.get('error')

  useEffect(() => {
    if (!loading && user) navigate('/', { replace: true })
  }, [user, loading, navigate])

  async function handleGoogleLogin() {
    setSigningIn(true)
    const { error } = await signInWithGoogle()
    if (error) setSigningIn(false)
  }

  async function handleDevSubmit(e: React.FormEvent) {
    e.preventDefault()
    setDevError('')
    setDevLoading(true)

    if (devMode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email: devEmail,
        password: devPassword,
        options: {
          data: { full_name: devEmail.split('@')[0] },
        },
      })
      if (error) {
        setDevError(error.message)
      } else {
        // Auto sign-in after signup
        await supabase.auth.signInWithPassword({ email: devEmail, password: devPassword })
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: devEmail,
        password: devPassword,
      })
      if (error) setDevError(error.message)
    }

    setDevLoading(false)
  }

  return (
    <div className="login-page">
      <div className="scanlines" />

      <div className="login-card">
        <div className="login-logo-wrapper">
          <img
            src="/dynapro-logo.png"
            alt="Dynapro"
            className="login-logo"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>

        <div className="login-title-block">
          <div className="login-game-title">CYBERSHIELD</div>
          <div className="login-game-sub">{t('login.subtitle')}</div>
          <div className="login-tagline">{t('login.tagline')}</div>
        </div>

        <div className="login-pixel-divider" />

        {errorParam === 'unauthorized_domain' && (
          <div className="login-error">{t('login.error_domain')}</div>
        )}
        {errorParam === 'generic' && (
          <div className="login-error">{t('login.error_generic')}</div>
        )}

        <button
          className="login-btn"
          onClick={handleGoogleLogin}
          disabled={signingIn || loading}
        >
          {signingIn ? '...' : t('login.button')}
        </button>

        {IS_DEV && (
          <div className="dev-login-section">
            <div className="dev-login-label">
              <span className="dev-badge">DEV</span>
              Login local — solo en desarrollo
            </div>

            <div className="dev-mode-toggle">
              <button
                className={`dev-mode-btn ${devMode === 'signin' ? 'active' : ''}`}
                onClick={() => { setDevMode('signin'); setDevError('') }}
                type="button"
              >
                Ingresar
              </button>
              <button
                className={`dev-mode-btn ${devMode === 'signup' ? 'active' : ''}`}
                onClick={() => { setDevMode('signup'); setDevError('') }}
                type="button"
              >
                Crear cuenta
              </button>
            </div>

            <form onSubmit={handleDevSubmit} className="dev-login-form">
              <input
                className="dev-input"
                type="email"
                placeholder="email@cualquiera.com"
                value={devEmail}
                onChange={(e) => setDevEmail(e.target.value)}
                required
              />
              <input
                className="dev-input"
                type="password"
                placeholder="contraseña (min 6 chars)"
                value={devPassword}
                onChange={(e) => setDevPassword(e.target.value)}
                required
                minLength={6}
              />
              {devError && <div className="dev-error">{devError}</div>}
              <button
                className="dev-submit-btn"
                type="submit"
                disabled={devLoading}
              >
                {devLoading ? '...' : devMode === 'signup' ? 'Crear y entrar' : 'Entrar'}
              </button>
            </form>
          </div>
        )}

        <div className="login-lang-row">
          <button
            className={`lang-btn ${i18n.language === 'es' ? 'active' : ''}`}
            onClick={() => i18n.changeLanguage('es')}
          >
            ES
          </button>
          <span className="lang-sep">|</span>
          <button
            className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </button>
        </div>
      </div>

      <div className="login-footer">
        Dynapro · {new Date().getFullYear()}
      </div>
    </div>
  )
}
