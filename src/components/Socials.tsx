import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMusic } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons'
import { getConfig } from "@/lib/hygraph";

export async function Socials({ className = '' }: Readonly<{ className?: string }>) {
  const config = await getConfig();
  
  return (
    <div className={`flex ${className}`}>
      <a className="mr-5" target="_blank" href={config.instagramLink}><FontAwesomeIcon icon={faInstagram} /></a>
      <a className="mr-5" target="_blank" href={config.spotifyLink}><FontAwesomeIcon icon={faSpotify} /></a>
      <a className="mr-5" target="_blank" href={config.appleMusicLink}><FontAwesomeIcon icon={faMusic} /></a>
      <a target="_blank" href={`mailto:${config.email}`}><FontAwesomeIcon icon={faEnvelope} /></a>
    </div>
  )
}
