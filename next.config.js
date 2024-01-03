const database = require('./src/database.json')

const remotePatterns = Array.from(new Set([
  ...database.images.map((image) => image.src),
  ...database.videos.map((video) => video.thumbnail)
].map((url) => {
  const parsedUrl = new URL(url);
  if (parsedUrl.hostname.includes('staticflickr')) {
    return url.split('_')[0] + '/**';
  }
  return url
})).values()).map((url) => {
  // console.log(url);
  const parsedUrl = new URL(url);
  return {
    protocol: parsedUrl.protocol.slice(0, -1),
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
    pathname: parsedUrl.pathname,
  }
});

// console.log(remotePatterns)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // remotePatterns,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'farm66.staticflickr.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'live.staticflickr.com',
        port: '',
        pathname: '/**'
      },
    ]
  }
}

module.exports = nextConfig
