import { useCallback, useState } from 'react'
import html2canvas from 'html2canvas'
import { supabase } from '../lib/supabase'

interface DiplomaResult {
  url: string
  certToken: string
}

interface UseDiplomaReturn {
  generating: boolean
  error: string | null
  result: DiplomaResult | null
  generate: (diplomaRef: HTMLElement, userId: string, finalScore: number) => Promise<DiplomaResult | null>
  download: (url: string, fullName: string) => void
}

export function useDiploma(): UseDiplomaReturn {
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<DiplomaResult | null>(null)

  const generate = useCallback(async (
    diplomaEl: HTMLElement,
    userId: string,
    finalScore: number,
  ): Promise<DiplomaResult | null> => {
    setGenerating(true)
    setError(null)

    try {
      // Check if certificate already exists
      const { data: existing } = await supabase
        .from('certificates')
        .select('cert_token, diploma_url')
        .eq('user_id', userId)
        .single()

      if (existing?.diploma_url) {
        const res = { url: existing.diploma_url, certToken: existing.cert_token }
        setResult(res)
        return res
      }

      // Render diploma to canvas
      const canvas = await html2canvas(diplomaEl, {
        scale: 2,
        backgroundColor: '#080e14',
        logging: false,
        useCORS: true,
      })

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('Canvas to blob failed'))),
          'image/png',
          1.0,
        )
      })

      const fileName = `${userId}/${Date.now()}.png`

      const { error: uploadError } = await supabase.storage
        .from('diplomas')
        .upload(fileName, blob, { contentType: 'image/png', upsert: true })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('diplomas')
        .getPublicUrl(fileName)

      const publicUrl = urlData.publicUrl

      // Save certificate record
      const { data: cert, error: certError } = await supabase
        .from('certificates')
        .upsert({
          user_id: userId,
          final_score: finalScore,
          diploma_url: publicUrl,
        }, { onConflict: 'user_id' })
        .select('cert_token, diploma_url')
        .single()

      if (certError) throw certError

      const res = { url: publicUrl, certToken: cert.cert_token }
      setResult(res)
      return res
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error generando diploma'
      setError(msg)
      return null
    } finally {
      setGenerating(false)
    }
  }, [])

  const download = useCallback((url: string, fullName: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = `CyberShield_Diploma_${fullName.replace(/\s+/g, '_')}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [])

  return { generating, error, result, generate, download }
}
