/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '122.45.203.134',
        port: '8080',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
