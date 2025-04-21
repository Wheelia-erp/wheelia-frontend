import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    async rewrites() {
      const backendUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
      console.log("backendUrl", backendUrl);
      return [
        {
          source: "/api/:path*",
          destination: backendUrl + "/:path*",
        },
      ];
    },
  
};

export default nextConfig;
