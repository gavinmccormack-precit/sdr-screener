import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep ffmpeg-static unbundled so its binary path resolves correctly at runtime.
  serverExternalPackages: ["ffmpeg-static"],
};

export default nextConfig;
