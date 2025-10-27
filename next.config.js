/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['grupoazimute.com.br', 'cdn.sanity.io']
    },
    // Configuração para evitar conflitos de porta
    webpack: (config, { dev }) => {
        if (dev) {
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 300,
            }
        }
        return config
    },
    // Configuração de porta para desenvolvimento
    devIndicators: {
        buildActivity: true,
        buildActivityPosition: 'bottom-right',
    },
}

module.exports = nextConfig
