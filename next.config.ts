import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Cloudflare Pages 静态托管
  trailingSlash: true,
};

export default nextConfig;
