import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Profile } from '../types'
import { ALLOWED_DOMAINS } from '../constants/domains'

interface AuthState {
  user: User | null
  profile: Profile | null
  loading: boolean
  isAdmin: boolean
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    isAdmin: false,
  })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user)
      } else {
        setState({ user: null, profile: null, loading: false, isAdmin: false })
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadProfile(session.user)
      } else {
        setState({ user: null, profile: null, loading: false, isAdmin: false })
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function loadProfile(user: User) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    setState({
      user,
      profile,
      loading: false,
      isAdmin: profile?.is_admin ?? false,
    })
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: { hd: 'dynaproco.com' },
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    return { error }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  function isDomainAllowed(email: string | undefined) {
    if (!email) return false
    const domain = email.split('@')[1]
    return ALLOWED_DOMAINS.includes(domain as typeof ALLOWED_DOMAINS[number])
  }

  return { ...state, signInWithGoogle, signOut, isDomainAllowed }
}
