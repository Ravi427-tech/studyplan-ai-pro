import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ['10.124.236.55'],
  },
  serverExternalPackages: ['bcryptjs'],
};

export default nextConfig;
