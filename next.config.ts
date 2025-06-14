import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [new URL('https://pub-7744c747312a4db3afe9366c16797634.r2.dev/**')],
  },
};

export default nextConfig;
