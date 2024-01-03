import Link from 'next/link'
import { getVideo, getVideos } from '@/lib/videos';
import { VimeoVideo } from '@/components/VimeoVideo';


export async function generateMetadata({ params: { id } }) {
  return {
    title: `derek lindsay | ${(await getVideo(id))?.title}`,
  }
}

export default async function Motion({ params: { id } }: { params: { id: string } }) {
  const videos = await getVideos();
  const videoIndex = videos.findIndex((video) => video.id === id);
  const video = videos[videoIndex];
  const nextVideo = videos[(videoIndex + 1) % videos.length];
  const previousVideo = videos[(videoIndex - 1 + videos.length) % videos.length];  
  
  return (
    <div className="w-full">
      <h1 className="uppercase text-3xl mb-3">
        <a target='_blank' href={`https://vimeo.com/${id}`}>{video?.title}</a>  
      </h1>
      <VimeoVideo id={id} />
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
