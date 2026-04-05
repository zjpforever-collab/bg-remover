import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Cloudflare Pages 静态托管
  trailingSlash: true,
  
  // 忽略构建错误
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;