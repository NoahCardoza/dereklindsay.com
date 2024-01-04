import Link from 'next/link'
import { getVideo, getVideos } from '@/lib/hygraph';
import { VimeoVideo } from '@/components/VimeoVideo';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const video = await getVideo(id);
  
  return {
    title: `derek lindsay | ${(await getVideo(id))?.title}`,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      title: `derek lindsay | ${(await getVideo(id))?.title}`,
      url: `/motion/${id}`,
      images: [
        {
          url: video.thumbnail,
          width: 200,
          height: 200,
          alt: '',
        },
      ],
    },
  }
}

export default async function Motion({ params: { id } }: PageProps) {
  const videos = await getVideos();
  
  const videoIndex = videos.findIndex((video) => video.id === id);
  const video = videos[videoIndex];
  const nextVideo = videos[(videoIndex + 1) % videos.length];
  const previousVideo = videos[(videoIndex - 1 + videos.length) % videos.length];  
  
  return (
    <div className="w-full">
      <h1 className="uppercase text-3xl mb-3">
        <a target='_blank' href={`https://vimeo.com/${video.vimeoId}`}>{video?.title}</a>  
      </h1>
      <VimeoVideo id={video.vimeoId} />
      <div className="flex justify-between mt-3">
        <Link href={`/motion/${previousVideo.id}`}>{previousVideo.title}</Link>
        <Link href={`/motion/${nextVideo.id}`}>{nextVideo.title}</Link>
        </div>
    </div>
  );
}

export async function generateStaticParams() {
  const videos = await getVideos();

  return videos.map((video) => ({
    id: video.id,
  }));
}
