/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL('https://pub-7744c747312a4db3afe9366c16797634.r2.dev/**')],
  },
};

export default nextConfig;
