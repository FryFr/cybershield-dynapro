import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import type { Profile, GameProgress } from '../types'
import LEVELS from '../engine/gameContent'

interface EmployeeRow {
  profile: Profile
  progress: GameProgress[]
}

export function Admin() {
  const { t } = useTranslation()
  const [rows, setRows] = useState<EmployeeRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('is_admin', false)
      .order('full_name')

    const { data: progress } = await supabase
      .from('game_progress')
      .select('*')

    const combined = (profiles ?? []).map((profile: Profile) => ({
      profile,
      progress: (progress ?? []).filter((p: GameProgress) => p.user_id === profile.id),
    }))

    setRows(combined)
    setLoading(false)
  }

  function exportCSV() {
    const headers = ['Nombre', 'Departamento', 'Niveles completados', 'Puntaje total', 'Tiempo promedio (min)']
    const data = rows.map(({ profile, progress }) => {
      const completed = progress.filter((p) => p.completed).length
      const totalScore = progress.reduce((acc, p) => acc + (p.score ?? 0), 0)
      const avgTime = progress.filter((p) => p.time_spent_sec).reduce((acc, p, _, arr) =>
        acc + (p.time_spent_sec ?? 0) / arr.length, 0)

      return [
        profile.full_name,
        profile.department ?? '',
        `${completed}/${LEVELS.length}`,
        totalScore,
        Math.round(avgTime / 60),
      ]
    })

    const csv = [headers, ...data].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cybershield_progress_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="admin-page">
      <div style={{ background: '#0a1520', borderBottom: '1px solid #003d5e', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 12, letterSpacing: 3, color: '#4db8e8', fontFamily: 'Courier New' }}>
          CYBERSHIELD · ADMIN
        </span>
      </div>

      <div className="admin-content">
        <div className="admin-title">{t('admin.title')}</div>

        <button className="admin-export-btn" onClick={exportCSV}>
          ↓ {t('admin.export')}
        </button>

        {loading ? (
          <div style={{ color: '#4db8e8', fontSize: 11 }}>Cargando...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t('admin.employees')}</th>
                <th>Dpto.</th>
                <th>{t('admin.completed_levels')}</th>
                <th>{t('admin.score')}</th>
                <th>{t('admin.time_avg')}</th>
                <th>{t('admin.certificate')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ profile, progress }) => {
                const completedLevels = progress.filter((p) => p.completed).length
                const totalScore = progress.reduce((acc, p) => acc + (p.score ?? 0), 0)
                const avgTimeSec = progress.filter((p) => p.time_spent_sec).reduce(
                  (acc, p, _, arr) => acc + (p.time_spent_sec ?? 0) / arr.length, 0
                )
                const hasCert = completedLevels === LEVELS.length

                return (
                  <tr key={profile.id}>
                    <td style={{ color: '#e0e8f0' }}>{profile.full_name}</td>
                    <td>{profile.department ?? '—'}</td>
                    <td style={{ color: completedLevels === LEVELS.length ? '#00c853' : '#4db8e8' }}>
                      {completedLevels}/{LEVELS.length}
                    </td>
                    <td>{totalScore.toLocaleString()}</td>
                    <td>
                      {avgTimeSec > 0 ? `${Math.round(avgTimeSec / 60)} min` : '—'}
                    </td>
                    <td style={{ color: hasCert ? '#00c853' : '#3a4a5a' }}>
                      {hasCert ? '✓ Certificado' : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
