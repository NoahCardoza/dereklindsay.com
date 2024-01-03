import database from "@/database.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMusic } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons'

export function Socials({ className = '' }: Readonly<{ className?: string}>) {
  return (
    <div className={`flex ${className}`}>
      <a className="mr-5" target="_blank" href={database.config.socials.instagram}><FontAwesomeIcon icon={faInstagram} /></a>
      <a className="mr-5" target="_blank" href={database.config.socials.spotify}><FontAwesomeIcon icon={faSpotify} /></a>
      <a className="mr-5" target="_blank" href={database.config.socials.appleMusic}><FontAwesomeIcon icon={faMusic} /></a>
      <a target="_blank" href={`mailto:${database.config.socials.email}`}><FontAwesomeIcon icon={faEnvelope} /></a>
    </div>
  )
}
