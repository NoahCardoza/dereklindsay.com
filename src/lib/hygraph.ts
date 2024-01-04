import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.HYGRAPH_API_URL,
  cache: new InMemoryCache(),
});

const GET_VIDEOS = gql`
  query Videos {
    videos(orderBy: order_ASC) {
      id
      order
      thumbnail
      title
      vimeoId
    }
  }
`;  

const GET_VIDEO = gql`
  query Video($id: ID!) {
    video(where: {id: $id}) {
      id
      order
      thumbnail
      title
      vimeoId
    }
  }
`;

const GET_CONFIG = gql`
  query Config {
    configs(first: 1) {
      appleMusicLink
      email
      instagramLink
      spotifyLink
      vimeoLink
      info {
        raw
      }
    }
  }
`;

const GET_ALBUMS = gql`
  query Albums {
    albums(orderBy: order_ASC) {
      flickrAlbumId
      title
      id
      slug
    }
  }
`;

const GET_ALBUM = gql`
  query Album($id: ID!) {
    album(where: {id: $id}) {
      flickrAlbumId
      title
      id
      slug
    }
  }
`;


const GET_ALBUM_BY_SLUG = gql`
  query Album($slug: String!) {
    album(where: {slug: $slug}) {
      flickrAlbumId
      title
      id
      slug
    }
  }
`;

export type HygraphVideo = {
  id: string;
  order: number;
  thumbnail: string;
  title: string;
  vimeoId: number;
}

export async function getVideos() {
  const { data } = await client.query({
    query: GET_VIDEOS,
  });
  
  return data.videos as HygraphVideo[];
}

export async function getVideo(id: string) {
  const { data } = await client.query({
    query: GET_VIDEO,
    variables: { id },
  });
  return data.video as HygraphVideo;
}

export type HygraphConfig = {
  appleMusicLink: string;
  email: string;
  instagramLink: string;
  spotifyLink: string;
  vimeoLink: string;
  info: {
    raw: any;
  }
}

export async function getConfig() {
  const { data } = await client.query({
    query: GET_CONFIG,
  });
  return data.configs[0] as HygraphConfig;
}

export type HygraphAlbum = {
  flickrAlbumId: string;
  title: string;
  id: string;
  slug: string;
}

export async function getAlbums() {
  const { data } = await client.query({
    query: GET_ALBUMS,
  });
  return data.albums as HygraphAlbum[];
}

export async function getAlbumBySlug(slug: string) {
  const { data } = await client.query({
    query: GET_ALBUM_BY_SLUG,
    variables: { slug },
  });
  
  return data.album as HygraphAlbum;
}

export async function getAlbum(id: string) {
  const { data } = await client.query({
    query: GET_ALBUM,
    variables: { id },
  });
  
  return data.album as HygraphAlbum;
}