import type { NextConfig } from "next";

// Optional: @codedesignai/nextjs-live-edit-plugin enables the
// in-iframe live-edit overlay when the sandbox installs it. We
// fall back to an identity wrapper when the plugin isn't available
// so the exported zip is still runnable standalone.
let withLiveEdit: <T>(c: T) => T = (c) => c;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  // @ts-ignore - JS module without types
  withLiveEdit = require("@codedesignai/nextjs-live-edit-plugin").withLiveEdit;
} catch {}

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    // Required for live-edit on overlayfs (Docker/ECS): disables
    // caches that prevent file edits from being reflected in SSR.
    serverComponentsHmrCache: false,
  },
};

export default withLiveEdit(nextConfig);
