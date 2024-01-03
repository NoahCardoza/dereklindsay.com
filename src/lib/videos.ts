import database from '@/database.json';

export const getVideos = async () => {
  return await database.videos
};

export const getVideo = async (id: string) => {
  return await database.videos.find((video) => video.id === id);
};