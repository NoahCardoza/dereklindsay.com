import PictureBook from "@/components/PictureBook";
import { Metadata } from "next";
import { getAlbum, getConfig } from "@/lib/hygraph";
import { RichText } from '@graphcms/rich-text-react-renderer';
import { getPhotosetPhotos } from "@/lib/flickr";

export const metadata: Metadata = {
  title: 'derek lindsay | info',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'derek lindsay | info',
    url: '/info',
    images: [
      {
        url: 'https://media.licdn.com/dms/image/D5603AQG3wmh1W_6G6g/profile-displayphoto-shrink_800_800/0/1689728168421?e=1709769600&v=beta&t=-cG66DHHSd-X4Hnt-VsUhGJRpc51DkuzV_8M6reU_j8',
        width: 200,
        height: 200,
        alt: '',
      },
    ],
  }
}

export default async function Info() {
  const config = await getConfig();
  const album = await getAlbum('clqycy1yf5u4t0bmtialvsw9m'); // selected works
  const photoset = await getPhotosetPhotos(album.flickrAlbumId);
  const images = photoset.map((photo: any) => photo.src);

  return (
    <PictureBook images={images}>
      <h2 className="uppercase text-3xl">Info</h2>
      <RichText
        content={config.info.raw}
        renderers={{
          h1: ({ children }) => <h3 className="text-2xl mt-3">{children}</h3>,
          h2: ({ children }) => <h4 className="text-xl mt-3">{children}</h4>,
          h3: ({ children }) => <h5 className="text-lg mt-3">{children}</h5>,
          p: ({ children }) => <p className="text-lg mt-3">{children}</p>,
          a: ({ children, openInNewTab, ...params }) => <a
            {...params}
            className="text-blue-500"
            target={openInNewTab ? '_blank' : '_self'}
          >
            {children}
          </a>,
        }}
      />
    </PictureBook>
  );
}
