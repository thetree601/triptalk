/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com'
      }
    ]
  },
  transpilePackages: ['apollo-upload-client']
};

export default nextConfig;
