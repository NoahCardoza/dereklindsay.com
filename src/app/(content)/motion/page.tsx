
import database from "@/database.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'derek lindsay | motion',
}

export default function Motion() {
  const videos = database.videos;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <Link key={video.id} href={`/motion/${video.id}`} className="bg-black">
            <div
              className="motion-frame transition-shadow ease-in-out delay-250 aspect-square  hover:shadow-lg flex justify-center items-center"
              style={{ '--src': `url(${video.thumbnail})` } as React.CSSProperties}
            >
              <FontAwesomeIcon icon={faCirclePlay} size="4x" color="white" className="z-50" />
            </div>
          </Link>
        ))}
      </div>
  );
}
