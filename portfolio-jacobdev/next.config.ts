import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const isStandalone = process.env.NEXT_STANDALONE === "1";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },

  // Enable standalone **only** when requested (e.g., inside Docker)
  ...(isStandalone ? { output: "standalone" } : {}),
};

export default withContentCollections(nextConfig);
