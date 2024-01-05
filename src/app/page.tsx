import Link from "next/link";
import PictureBook from "../components/PictureBook";
import { SoundButton } from "@/components/SoundButton";
import { Socials } from "@/components/Socials";
import { getAlbum, getAlbums, getConfig } from "@/lib/hygraph";
import { getPhotosetPhotos } from "@/lib/flickr";
import { Fragment } from "react";
import { dynamicBlurDataUrl } from "@/lib/dynamicBlurDataUrl";

export default async function Landing() {
  const albums = await getAlbums();
  const album = await getAlbum('clqycy1yf5u4t0bmtialvsw9m'); // selected works
  const photoset = await getPhotosetPhotos(album.flickrAlbumId);
  const images = photoset.map((photo: any) => photo.src);
  const firstImageBlurredPlaceholder = await dynamicBlurDataUrl(images[0]);
  const config = await getConfig();

  return (
    <PictureBook images={images} imagePlaceholder={firstImageBlurredPlaceholder} className="bg-black">
      <h1 className="uppercase font-bold text-4xl">Derek Lindsay</h1>
      <div className="flex text-lg my-4 justify-between w-full max-w-80">
        {albums.map((album) => (
          <Fragment key={album.id}>
            <Link href={`/album/${album.slug}`}>{album.title}</Link> |
          </Fragment>
        ))}
        <Link href="/motion" >motion</Link> |
        <SoundButton />
      </div>
      <Socials config={config} className="w-full justify-center" />
    </PictureBook>
  );
}
