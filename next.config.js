/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Get the GitHub repository name from the environment or use a default
  basePath: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_PATH || '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_PATH || '' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
