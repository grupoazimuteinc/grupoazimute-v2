import { client } from '@/lib/sanity.client'

import imageUrlBuilder from '@sanity/image-url'

const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source: any) {
    if (!builder) {
        // Return a fallback object with url method that returns empty string
        return {
            url: () => ''
        }
    }
    return builder.image(source)
}