/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/trend.json',
        destination: '/api/trend',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
