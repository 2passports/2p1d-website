import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework via the X-Powered-By response header.
  poweredByHeader: false,
  // Hide the small floating dev indicator (bottom-left by default). It only
  // ever shows during local development, never in production, but it was
  // sitting over the hero subscriber stat card on mobile. Next still surfaces
  // build and runtime errors with this off.
  devIndicators: false,
  images: {
    remotePatterns: [new URL("https://img.youtube.com/**")],
  },
};

export default nextConfig;
