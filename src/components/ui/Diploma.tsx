import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import LEVELS from '../../engine/gameContent'

interface DiplomaProps {
  fullName: string
  finalScore: number
  completedLevels: number
  issuedAt: string
  certToken: string
}

export const Diploma = forwardRef<HTMLDivElement, DiplomaProps>(
  ({ fullName, finalScore, completedLevels, issuedAt, certToken }, ref) => {
    const { t, i18n } = useTranslation()
    const locale = i18n.language === 'en' ? 'en-US' : 'es-AR'
    const date = new Date(issuedAt).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    return (
      <div ref={ref} style={diplomaWrapper}>
        <div style={stripeTop} />

        <div style={logoRow}>
          <img
            src="/dynapro-logo.png"
            alt="Dynapro"
            style={logoImg}
            crossOrigin="anonymous"
          />
        </div>

        <div style={labelStyle}>{t('diploma.title')}</div>
        <div style={courseStyle}>{t('diploma.course')}</div>

        <div style={nameStyle}>{fullName}</div>

        <div style={descStyle}>{t('diploma.completed')}</div>

        <div style={statsRow}>
          <div style={statBlock}>
            <span style={statVal}>{completedLevels}/{LEVELS.length}</span>
            <span style={statLbl}>{t('diploma.levels')}</span>
          </div>
          <div style={statDivider} />
          <div style={statBlock}>
            <span style={statVal}>{finalScore.toLocaleString()}</span>
            <span style={statLbl}>{t('diploma.points')}</span>
          </div>
          <div style={statDivider} />
          <div style={statBlock}>
            <span style={statVal}>{date}</span>
            <span style={statLbl}>{t('diploma.date')}</span>
          </div>
        </div>

        <div style={badgeRow}>
          <span style={verifiedBadge}>✓ {t('diploma.verified')}</span>
          <span style={tokenText}>cert.dynapro/{certToken.slice(0, 8)}</span>
        </div>

        <div style={stripeBottom} />
      </div>
    )
  },
)

Diploma.displayName = 'Diploma'

const stripePattern = `repeating-linear-gradient(90deg, #005687 0px, #005687 8px, #4B4F54 8px, #4B4F54 16px)`

const diplomaWrapper: React.CSSProperties = {
  width: 680,
  background: 'linear-gradient(135deg, #080e14 0%, #0d1a28 100%)',
  border: '2px solid #005687',
  fontFamily: 'Courier New, monospace',
  position: 'relative',
  padding: '0 0 0 0',
  overflow: 'hidden',
}

const stripeTop: React.CSSProperties = {
  height: 6,
  background: stripePattern,
}

const logoRow: React.CSSProperties = {
  padding: '24px 32px 0',
  display: 'flex',
  justifyContent: 'center',
}

const logoImg: React.CSSProperties = {
  height: 36,
  objectFit: 'contain',
  filter: 'brightness(1.1)',
}

const labelStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: 10,
  letterSpacing: 5,
  color: '#4db8e8',
  textTransform: 'uppercase',
  marginTop: 20,
  paddingBottom: 12,
}

const courseStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: 9,
  letterSpacing: 3,
  color: '#6ecff6',
  textTransform: 'uppercase',
  marginBottom: 16,
}

const nameStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: 32,
  color: '#ffffff',
  fontFamily: 'Georgia, serif',
  padding: '0 32px 8px',
  borderBottom: '1px solid #003d5e',
  margin: '0 32px',
}

const descStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: 11,
  color: '#D0D3D4',
  marginTop: 10,
  letterSpacing: 0.5,
}

const statsRow: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 0,
  margin: '20px 32px',
  background: '#0a1828',
  border: '1px solid #003d5e',
}

const statBlock: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '12px 8px',
  gap: 4,
}

const statVal: React.CSSProperties = {
  fontSize: 14,
  color: '#4db8e8',
  fontWeight: 'bold',
  letterSpacing: 1,
}

const statLbl: React.CSSProperties = {
  fontSize: 8,
  color: '#4B4F54',
  letterSpacing: 1,
  textTransform: 'uppercase',
}

const statDivider: React.CSSProperties = {
  width: 1,
  height: 40,
  background: '#003d5e',
}

const badgeRow: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 12,
  padding: '0 32px 20px',
}

const verifiedBadge: React.CSSProperties = {
  background: '#003d5e',
  border: '1px solid #005687',
  color: '#4db8e8',
  fontSize: 9,
  padding: '3px 12px',
  letterSpacing: 1.5,
}

const tokenText: React.CSSProperties = {
  fontSize: 8,
  color: '#4B4F54',
  letterSpacing: 0.5,
  fontFamily: 'Courier New, monospace',
}

const stripeBottom: React.CSSProperties = {
  height: 6,
  background: stripePattern,
}
