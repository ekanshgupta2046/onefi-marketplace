import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "1fi.in",
      },
      {
        protocol: "https",
        hostname: "cdn.1fi.in",
      },
    ],
  },
};

export default nextConfig;
