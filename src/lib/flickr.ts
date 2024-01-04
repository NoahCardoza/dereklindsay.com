const BASE_URL = 'https://api.flickr.com/services/rest';

async function flickr(method: string, params: Record<string, string>) {
  const url = new URL(BASE_URL);
  url.searchParams.append('method', method);
  url.searchParams.append('api_key', process.env.FLICKR_API_KEY as string);
  url.searchParams.append('format', 'json');
  url.searchParams.append('nojsoncallback', '1');

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value as string);
  }

  const response = await fetch(url, { method: 'POST' });
  const data = await response.json();
  return data;
}

export async function getPhotosetPhotos(photosetId: string) { 
  const params = {
    photoset_id: photosetId,
    extras: 'description,url_o',
  };

  const { photoset } = await flickr('flickr.photosets.getPhotos', params);

  return photoset.photo.map((photo: any) => ({
    id: photo.id,
    src: photo.url_o,
    caption: photo.title,
    description: photo.description._content,
    // TODO: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`
  }));
}
    
