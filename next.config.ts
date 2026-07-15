import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // image
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "*",
    },
  ],
}

};

export default nextConfig;
