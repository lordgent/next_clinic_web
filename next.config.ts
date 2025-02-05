import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/user/layanan/:name',
        destination: '/user/detail-service',
      },
    ]
  },
};

export default nextConfig;
