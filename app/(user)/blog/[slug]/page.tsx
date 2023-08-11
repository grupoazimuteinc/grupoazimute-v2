import Image from 'next/image'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'

import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/urlFor'
import { RichTextComponents } from '@/components/rich-text-components'

type Props = {
    params: {
        slug: string
    }
}

export const revalidate = 60

export async function generateStaticParams() {
    const query = groq`
        *[_type=='post'] {
            slug
        }
    `

    const slugs: Post[] = await client.fetch(query)
    const slugRoutes = slugs.map((slug) => slug.slug.current)

    return slugRoutes.map(slug => ({
        slug
    }))
}

export default async function Post({ params: { slug } }: Props) {
    const query = groq`
        *[_type=='post' && slug.current == $slug][0] {
            ...,
            categories[]->
        }
    `

    const post: Post = await client.fetch(query, { slug })
    
    return (
        <div>
            Post: { slug }

            <Image src={ urlFor(post.mainImage).url() } alt={ post.author?.name } width={ 500 } height={ 500 } />

            <h1>{ post.title }</h1>

            <p>{ new Date(post._createdAt).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }) }</p>

            <h2>{ post.description }</h2>

            { post.categories?.map(category => ( 
                <p key={ category._id }>{ category.title }</p> 
            )) }

            <div>
                {/* 
                // @ts-ignore */}
                <PortableText value={ post.body } components={ RichTextComponents } />
            </div>
        </div>
    )
}
