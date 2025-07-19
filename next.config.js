// next.config.js
const { withNextVideo } = require('next-video/process')

const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.c2.liara.space',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = withNextVideo(nextConfig)
