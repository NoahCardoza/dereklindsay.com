import Link from "next/link";
import PictureBook from "../components/PictureBook";
import { SoundButton } from "@/components/SoundButton";
import { Socials } from "@/components/Socials";
import { getAlbum, getAlbums } from "@/lib/hygraph";
import { getPhotosetPhotos } from "@/lib/flickr";
import { Fragment } from "react";

export default async function Landing() {
  const albums = await getAlbums();
  const album = await getAlbum('clqycy1yf5u4t0bmtialvsw9m'); // selected works
  const photoset = await getPhotosetPhotos(album.flickrAlbumId);
  const images = photoset.map((photo: any) => photo.src);

  return (
    <PictureBook images={images} className="bg-black">
      <h1 className="uppercase font-bold text-4xl">Derek Lindsay</h1>
      <div className="flex text-lg my-4 justify-between w-full">
        {albums.map((album) => (
          <Fragment key={album.id}>
            <Link href={`/album/${album.slug}`}>{album.title}</Link> |
          </Fragment>
        ))}
        <Link href="/motion" >motion</Link> |
        <SoundButton />
      </div>
      <Socials className="w-full justify-center" />
    </PictureBook>
  );
}
