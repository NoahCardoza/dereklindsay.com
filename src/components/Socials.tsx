import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMusic } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons'
import { HygraphConfig } from "@/lib/hygraph";

export function Socials({ config, className = '' }: Readonly<{ className?: string, config: HygraphConfig }>) {
  return (
    <div className={`flex ${className}`}>
      <a className="mr-5" target="_blank" href={config.instagramLink}><FontAwesomeIcon icon={faInstagram} /></a>
      <a className="mr-5" target="_blank" href={config.spotifyLink}><FontAwesomeIcon icon={faSpotify} /></a>
      <a className="mr-5" target="_blank" href={config.appleMusicLink}><FontAwesomeIcon icon={faMusic} /></a>
      <a target="_blank" href={`mailto:${config.email}`}><FontAwesomeIcon icon={faEnvelope} /></a>
    </div>
  )
}
