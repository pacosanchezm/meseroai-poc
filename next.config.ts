import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sushifactory.app",
      },
    ],
  },
};

export default nextConfig;
