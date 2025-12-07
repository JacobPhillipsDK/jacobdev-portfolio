import type {NextConfig} from "next";
import {withContentCollections} from "@content-collections/next";

const isStandalone = process.env.NEXT_STANDALONE === "1";
const isDev = process.env.NODE_ENV !== 'production';

/** Build remotePatterns dynamically (dev + optional payload host) */
function buildRemotePatterns() {
    const patterns: any[] = [
        // Allow local dev origin with explicit port
        {
            protocol: "http",
            hostname: "localhost",
            port: "3000",
            pathname: "/api/media/**",
        },
    ];

    // If you have a PAYLOAD_API_URL env var (prod), add it too
    const payload = process.env.PAYLOAD_API_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
    if (payload) {
        try {
            const u = new URL(payload);
            patterns.push({
                protocol: u.protocol.replace(":", ""),
                hostname: u.hostname,
                port: u.port || undefined,
                pathname: "/api/media/**",
            });
        } catch (e) {
            console.warn("Invalid PAYLOAD_API_URL:", payload);
        }
    }

    return patterns;
}

const nextConfig: NextConfig = {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    experimental: {
        serverActions: {
            allowedOrigins: ["localhost:3000"],
        },
    },

    images: {
        // remotePatterns must match the image absolute URLs used by next/image
        remotePatterns: buildRemotePatterns(),
        // allowed qualities (Next.js 16+ requires this)
        qualities: [25, 50, 70, 75, 90, 100],
        unoptimized: isDev,
    },

    ...(isStandalone ? {output: "standalone"} : {}),
};

export default withContentCollections(nextConfig);
