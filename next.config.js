/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'grupoazimute.com.br',
            },
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/tools',
                destination: '/dashboard/tools',
                permanent: true,
            },
            {
                source: '/tools/assinaturas',
                destination: '/dashboard/tools/assinaturas',
                permanent: true,
            },
            {
                source: '/tools/assinaturas/:slug',
                destination: '/dashboard/tools/assinaturas/:slug',
                permanent: true,
            },
            {
                source: '/tools/assinaturas/:slug/html',
                destination: '/dashboard/tools/assinaturas/:slug/html',
                permanent: true,
            },
        ]
    },
    webpack: (config, { dev }) => {
        if (dev) {
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 300,
            }
        }
        return config
    },
}

module.exports = nextConfig
