
import Slideshow from "@/components/Slideshow";
import { getAlbumBySlug, getAlbums } from "@/lib/hygraph";
import { getPhotosetPhotos } from "@/lib/flickr";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params: { slug } }: PageProps) {
  const album = await getAlbumBySlug(slug);
  
  return {
    title: `derek lindsay | ${album?.title}`,
  }
}

export async function generateStaticParams() {
  const albums = await getAlbums();

  return albums.map((album) => ({
    slug: album.slug,
  }));
}

export default async function AlbumPage({ params: { slug } }: PageProps) {
  const album = await getAlbumBySlug(slug);
  const images = await getPhotosetPhotos(album.flickrAlbumId);
  
  return (  
    <Slideshow
      album={album.title}
      images={images} />  
  );
}