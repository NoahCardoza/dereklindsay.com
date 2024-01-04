/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.staticflickr.com',
        port: '',
        pathname: '/**'
      },
    ]
  }
}
  
module.exports = nextConfig;