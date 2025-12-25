import type { NextConfig } from "next";

interface CustomNextConfig extends Omit<NextConfig, 'images'> {
  images?: {
    remotePatterns?: Array<{
      protocol: 'http' | 'https';
      hostname: string;
      port?: string;
      pathname?: string;
    }>;
    deviceSizes?: number[];
    imageSizes?: number[];
  };
}

const nextConfig: CustomNextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  } as const,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8008',
  },
};

export default nextConfig;