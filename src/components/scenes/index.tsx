import { PhishingScene } from './PhishingScene'
import { RansomwareScene } from './RansomwareScene'
import { PhysicalScene } from './PhysicalScene'
import { SocialEngineeringScene } from './SocialEngineeringScene'
import { PasswordsScene } from './PasswordsScene'
import { UsbScene } from './UsbScene'
import { ComplianceScene } from './ComplianceScene'
import { RemoteWorkScene } from './RemoteWorkScene'
import { MalwareScene } from './MalwareScene'

const SCENE_MAP: Record<string, React.FC> = {
  phishing: PhishingScene,
  ransomware: RansomwareScene,
  physical: PhysicalScene,
  social_engineering: SocialEngineeringScene,
  passwords: PasswordsScene,
  usb: UsbScene,
  compliance: ComplianceScene,
  remote_work: RemoteWorkScene,
  malware: MalwareScene,
}

interface SceneRendererProps {
  levelId: string
}

export function SceneRenderer({ levelId }: SceneRendererProps) {
  const SceneComponent = SCENE_MAP[levelId]

  if (!SceneComponent) {
    return (
      <div className="pixel-scene" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4db8e8', fontSize: 12, letterSpacing: 2 }}>
        LOADING SCENE...
      </div>
    )
  }

  return <SceneComponent />
}
