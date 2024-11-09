// next.config.mjs
import { withContentCollections } from '@content-collections/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3000'],
        },
    },
    output: 'standalone',
    // Add this to handle the subdomain redirects
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: '^([^.]+)\\.localhost$',
                    },
                ],
                permanent: false,
                destination: 'http://localhost:3000/404',
            },
        ];
    },
};

export default withContentCollections(nextConfig);
