import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

interface CertData {
  full_name: string
  issued_at: string
  final_score: number
  diploma_url: string | null
}

export function Verify() {
  const { token } = useParams<{ token: string }>()
  const [cert, setCert] = useState<CertData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!token) { setNotFound(true); setLoading(false); return }
    fetchCert(token)
  }, [token])

  async function fetchCert(certToken: string) {
    const { data, error } = await supabase
      .from('certificates')
      .select('final_score, issued_at, diploma_url, profiles(full_name)')
      .eq('cert_token', certToken)
      .single()

    if (error || !data) {
      setNotFound(true)
    } else {
      setCert({
        full_name: (data.profiles as unknown as { full_name: string })?.full_name ?? 'Empleado',
        issued_at: data.issued_at,
        final_score: data.final_score,
        diploma_url: data.diploma_url,
      })
    }
    setLoading(false)
  }

  if (loading) return <div className="loading-screen"><div className="pixel-spinner" /></div>

  if (notFound) {
    return (
      <div className="verify-page">
        <div className="verify-card not-found">
          <div className="verify-icon">⚠</div>
          <div className="verify-title">Certificado no encontrado</div>
          <div className="verify-desc">El token de verificación no es válido o expiró.</div>
        </div>
      </div>
    )
  }

  const date = cert ? new Date(cert.issued_at).toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  }) : ''

  return (
    <div className="verify-page">
      <div className="verify-card">
        <div className="verify-stripe" />

        <div className="verify-logo-row">
          <img
            src="/dynapro-logo.png"
            alt="Dynapro"
            style={{ height: 30, objectFit: 'contain' }}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>

        <div className="verify-badge">✓ CERTIFICADO VERIFICADO</div>

        <div className="verify-name">{cert?.full_name}</div>
        <div className="verify-desc">completó CyberShield by Dynapro</div>

        <div className="verify-meta">
          <div className="verify-meta-item">
            <span className="verify-meta-val">{cert?.final_score?.toLocaleString()}</span>
            <span className="verify-meta-lbl">puntos</span>
          </div>
          <div className="verify-meta-sep" />
          <div className="verify-meta-item">
            <span className="verify-meta-val">{date}</span>
            <span className="verify-meta-lbl">fecha de emisión</span>
          </div>
        </div>

        {cert?.diploma_url && (
          <a
            href={cert.diploma_url}
            download
            className="verify-download-btn"
            target="_blank"
            rel="noreferrer"
          >
            ↓ Descargar diploma PNG
          </a>
        )}

        <div className="verify-token">
          Token: {token}
        </div>

        <div className="verify-stripe" />
      </div>
    </div>
  )
}
