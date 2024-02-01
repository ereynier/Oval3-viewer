/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'marketplace.oval3.game',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'nft.oval3.game',
                pathname: '/**',
            }
        ],
    }
};

export default nextConfig;
