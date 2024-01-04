
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";

import { Metadata } from "next";
import { getVideos } from "@/lib/hygraph";

export const metadata: Metadata = {
  title: 'derek lindsay | motion',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'derek lindsay | motion',
    url: '/motion',
    images: [
      {
        url: 'https://i.vimeocdn.com/portrait/87513765_288x288',
        width: 200,
        height: 200,
        alt: '',
      },
    ],
  },
}

export default async function Motion() {
  const videos = await getVideos();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3 sm:p-0">
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
