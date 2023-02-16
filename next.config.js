/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", 'images.unsplash.com'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],

  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/steven-tey/precedent",
        permanent: false,
      },


      {
        source: '/u/:uid/t/:slug',
        destination: '/u/:uid/t/:slug/tong-quan',
        permanent: false,
      },


    ];
  },
};

module.exports = nextConfig;
