/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['grupoazimute.com.br', 'cdn.sanity.io']
    },
    experimental: {
        serverActions: true,
    },
    // Otimizar preload de recursos
    onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 2,
    },
}

module.exports = nextConfig
