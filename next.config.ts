import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/test',
  assetPrefix: '/test/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;