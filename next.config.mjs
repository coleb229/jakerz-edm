/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jakerz-edm.s3.us-east-2.amazonaws.com',
      },
    ],
  },
  webpack(config) {
    config.ignoreWarnings = [/Serializing big strings/];
    return config;
  },
}

export default nextConfig