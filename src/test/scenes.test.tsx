import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PhishingScene } from '../components/scenes/PhishingScene'
import { RansomwareScene } from '../components/scenes/RansomwareScene'
import { PhysicalScene } from '../components/scenes/PhysicalScene'
import { SocialEngineeringScene } from '../components/scenes/SocialEngineeringScene'
import { PasswordsScene } from '../components/scenes/PasswordsScene'
import { UsbScene } from '../components/scenes/UsbScene'
import { ComplianceScene } from '../components/scenes/ComplianceScene'
import { RemoteWorkScene } from '../components/scenes/RemoteWorkScene'
import { MalwareScene } from '../components/scenes/MalwareScene'

// ── Mocks ──────────────────────────────────────────────────────────────────

type Phase = 'SCENE' | 'CONSEQUENCE'

let mockPhase: Phase = 'SCENE'
let mockSceneIndex = 0
let mockLang = 'es'

vi.mock('../engine/GameContext', () => ({
  useGame: () => ({ currentSceneIndex: mockSceneIndex, phase: mockPhase }),
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: mockLang },
  }),
}))

// ── Helpers ────────────────────────────────────────────────────────────────

function renderScene(Comp: React.ComponentType) {
  return render(<Comp />)
}

function hasConsequenceOverlay(container: HTMLElement) {
  return container.querySelector('.sc-consequence-overlay') !== null
}

function hasConsequenceTag(container: HTMLElement) {
  return container.querySelector('.sc-tag-blink') !== null
}

// ── Scene registry ─────────────────────────────────────────────────────────

const SCENES = [
  { name: 'PhishingScene',           Comp: PhishingScene,          sceneCount: 3 },
  { name: 'RansomwareScene',         Comp: RansomwareScene,         sceneCount: 3 },
  { name: 'PhysicalScene',           Comp: PhysicalScene,           sceneCount: 3 },
  { name: 'SocialEngineeringScene',  Comp: SocialEngineeringScene,  sceneCount: 3 },
  { name: 'PasswordsScene',          Comp: PasswordsScene,          sceneCount: 3 },
  { name: 'UsbScene',                Comp: UsbScene,                sceneCount: 3 },
  { name: 'ComplianceScene',         Comp: ComplianceScene,         sceneCount: 3 },
  { name: 'RemoteWorkScene',         Comp: RemoteWorkScene,         sceneCount: 3 },
  { name: 'MalwareScene',            Comp: MalwareScene,            sceneCount: 3 },
]

// ── Shared tests ───────────────────────────────────────────────────────────

for (const { name, Comp, sceneCount } of SCENES) {
  describe(name, () => {
    beforeEach(() => {
      mockPhase = 'SCENE'
      mockLang = 'es'
    })

    for (let i = 0; i < sceneCount; i++) {
      it(`renders scene ${i} without error`, () => {
        mockSceneIndex = i
        expect(() => renderScene(Comp)).not.toThrow()
      })
    }

    it('does NOT show consequence overlay in SCENE phase', () => {
      mockSceneIndex = 0
      mockPhase = 'SCENE'
      const { container } = renderScene(Comp)
      expect(hasConsequenceOverlay(container)).toBe(false)
    })

    it('shows consequence overlay in CONSEQUENCE phase', () => {
      mockSceneIndex = 0
      mockPhase = 'CONSEQUENCE'
      const { container } = renderScene(Comp)
      expect(hasConsequenceOverlay(container)).toBe(true)
    })

    it('shows NO blinking consequence tags in SCENE phase (no spoilers)', () => {
      for (let i = 0; i < sceneCount; i++) {
        mockSceneIndex = i
        mockPhase = 'SCENE'
        const { container } = renderScene(Comp)
        expect(hasConsequenceTag(container)).toBe(false)
      }
    })

    it('shows blinking consequence tags in CONSEQUENCE phase', () => {
      mockSceneIndex = 0
      mockPhase = 'CONSEQUENCE'
      const { container } = renderScene(Comp)
      expect(hasConsequenceTag(container)).toBe(true)
    })
  })
}

// ── Language-specific tests ────────────────────────────────────────────────

describe('PhishingScene — bilingual', () => {
  beforeEach(() => { mockSceneIndex = 0 })

  it('renders ES monitor content in Spanish', () => {
    mockPhase = 'SCENE'
    mockLang = 'es'
    const { container } = render(<PhishingScene />)
    expect(container.textContent).toContain('BANDEJA DE ENTRADA')
  })

  it('renders EN monitor content in English', () => {
    mockPhase = 'SCENE'
    mockLang = 'en'
    const { container } = render(<PhishingScene />)
    expect(container.textContent).toContain('INBOX')
  })

  it('shows CONSEQUENCE content in ES', () => {
    mockPhase = 'CONSEQUENCE'
    mockLang = 'es'
    const { container } = render(<PhishingScene />)
    expect(container.textContent).toContain('CREDENCIALES ROBADAS')
  })

  it('shows CONSEQUENCE content in EN', () => {
    mockPhase = 'CONSEQUENCE'
    mockLang = 'en'
    const { container } = render(<PhishingScene />)
    expect(container.textContent).toContain('CREDENTIALS STOLEN')
  })
})

describe('SocialEngineeringScene — CEO fraud scene', () => {
  beforeEach(() => { mockSceneIndex = 1 })

  it('shows Jon Bell as CEO (not García)', () => {
    mockPhase = 'SCENE'
    mockLang = 'es'
    const { container } = render(<SocialEngineeringScene />)
    expect(container.textContent).toContain('Jon Bell')
    expect(container.textContent).not.toContain('García')
  })
})

describe('PasswordsScene — passphrase scene', () => {
  beforeEach(() => { mockSceneIndex = 1 })

  it('shows alphanumeric passphrase in ES', () => {
    mockPhase = 'SCENE'
    mockLang = 'es'
    const { container } = render(<PasswordsScene />)
    expect(container.textContent).toContain('Lluvia!2-Cohete#9-Azul$7')
  })

  it('shows alphanumeric passphrase in EN', () => {
    mockPhase = 'SCENE'
    mockLang = 'en'
    const { container } = render(<PasswordsScene />)
    expect(container.textContent).toContain('Rain!2-Rocket#9-Blue$7')
  })

  it('shows CONSEQUENCE message when password cracked', () => {
    mockPhase = 'CONSEQUENCE'
    mockLang = 'es'
    const { container } = render(<PasswordsScene />)
    expect(container.textContent).toContain('CRACKEADA')
  })
})

describe('RansomwareScene — ZIP email scene', () => {
  beforeEach(() => { mockSceneIndex = 1 })

  it('shows delivery email content in ES', () => {
    mockPhase = 'SCENE'
    mockLang = 'es'
    const { container } = render(<RansomwareScene />)
    expect(container.textContent).toContain('NOTIFICACIÓN DE ENTREGA')
  })

  it('shows delivery email content in EN', () => {
    mockPhase = 'SCENE'
    mockLang = 'en'
    const { container } = render(<RansomwareScene />)
    expect(container.textContent).toContain('DELIVERY NOTIFICATION')
  })
})

describe('MalwareScene — pirate software scene', () => {
  beforeEach(() => { mockSceneIndex = 1 })

  it('shows pirate site warning in ES', () => {
    mockPhase = 'SCENE'
    mockLang = 'es'
    const { container } = render(<MalwareScene />)
    expect(container.textContent).toContain('MALWARE DETECTADO EN DESCARGA')
  })

  it('shows backdoor consequence in EN', () => {
    mockPhase = 'CONSEQUENCE'
    mockLang = 'en'
    const { container } = render(<MalwareScene />)
    expect(container.textContent).toContain('BACKDOOR ACTIVE')
  })
})

describe('RemoteWorkScene — airport laptop scene', () => {
  beforeEach(() => { mockSceneIndex = 2 })

  it('shows Hermosillo airport gate in both languages', () => {
    mockPhase = 'SCENE'
    mockLang = 'en'
    const { container } = render(<RemoteWorkScene />)
    expect(container.textContent).toContain('GATE A3 → MEX')
  })
})
