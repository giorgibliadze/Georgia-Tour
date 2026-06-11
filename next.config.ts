import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Unsplash + our R2 CDN for Next.js <Image />
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-940ccf6255b54fa799a9b01050e6c227.r2.dev",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Strict mode catches double-render bugs early
  reactStrictMode: true,

  // Compiler options
  compiler: {
    // Remove all console.* in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff"       },
          { key: "X-Frame-Options",        value: "DENY"          },
          { key: "X-XSS-Protection",       value: "1; mode=block" },
          { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
