import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tmpddpfoickfjtwfnbyo.supabase.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // ✅ Added for stable seeding thumbnails
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co", // ✅ Optional (if you want placeholder images)
        port: "",
        pathname: "/**",
      },
    ],
  },
  /* other config options here */
};

export default nextConfig;
