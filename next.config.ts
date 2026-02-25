import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trustedgemlab.sgp1.digitaloceanspaces.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
