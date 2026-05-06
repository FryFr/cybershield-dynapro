import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { ALLOWED_DOMAINS } from '../constants/domains'

export function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      if (error || !session) {
        navigate('/login?error=generic', { replace: true })
        return
      }

      const email = session.user.email
      const domain = email?.split('@')[1]

      if (!domain || !ALLOWED_DOMAINS.includes(domain as typeof ALLOWED_DOMAINS[number])) {
        await supabase.auth.signOut()
        navigate('/login?error=unauthorized_domain', { replace: true })
        return
      }

      await ensureProfile(session.user.id, session.user.user_metadata?.full_name ?? email ?? '')
      navigate('/', { replace: true })
    })
  }, [navigate])

  return (
    <div className="loading-screen">
      <div className="pixel-spinner" />
      <p>Verificando acceso...</p>
    </div>
  )
}

async function ensureProfile(userId: string, fullName: string) {
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .single()

  if (!existing) {
    await supabase.from('profiles').insert({
      id: userId,
      full_name: fullName,
      preferred_lang: 'es',
      is_admin: false,
    })
  }
}
