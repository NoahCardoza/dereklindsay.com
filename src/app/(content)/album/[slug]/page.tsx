
import Slideshow from "@/components/Slideshow";
import { getAlbumBySlug, getAlbums } from "@/lib/hygraph";
import { getPhotosetPhotos } from "@/lib/flickr";
import { dynamicBlurDataUrl } from "@/lib/dynamicBlurDataUrl";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: PageProps) {
  const params = await props.params;

  const {
    slug
  } = params;

  const album = await getAlbumBySlug(slug);
  const images = await getPhotosetPhotos(album.flickrAlbumId);

  return {
    title: `derek lindsay | ${album?.title}`,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      title: `derek lindsay | ${album?.title}`,
      images: [
        {
          url: images[0].src,
          width: 200,
          height: 200,
          alt: '',
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const albums = await getAlbums();

  return albums.map((album) => ({
    slug: album.slug,
  }));
}

export default async function AlbumPage(props: PageProps) {
  const params = await props.params;

  const {
    slug
  } = params;

  const album = await getAlbumBySlug(slug);
  const images = await getPhotosetPhotos(album.flickrAlbumId);
  const firstImageBlurredPlaceholder = await dynamicBlurDataUrl(images[0].srcLowRes);

  return (  
    <Slideshow
      album={album.title}
      images={images}
      firstImageBlurredPlaceholder={firstImageBlurredPlaceholder}
    />  
  );
}