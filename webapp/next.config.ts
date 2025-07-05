import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/apps/:appId',
        destination: '/apps/:appId/users',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
