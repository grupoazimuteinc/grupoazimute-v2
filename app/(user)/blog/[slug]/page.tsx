import Link from 'next/link'
import Image from 'next/image'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'

import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/urlFor'
import { RichTextComponents } from '@/components/rich-text-components'

type Props = {
    params: {
        slug: string
    },

    
}

export const revalidate = 60

// export async function generateStaticParams() {
//     const query = groq`
//         *[_type=='post'] {
//             slug
//         }
//     `

//     const slugs: Post[] = await client.fetch(query)
//     const slugRoutes = slugs.map((slug) => slug.slug.current)

//     return slugRoutes.map(slug => ({
//         slug
//     }))
// }

export default async function Post({ params: { slug } }: Props) {
    const query = groq`
        *[_type=='post' && slug.current == $slug][0] {
            ...,
            categories[]->
        }
    `

    const post: Post = await client.fetch(query, { slug })
    console.log(post)

    
    
    return (
        <div className="max-w-[800px] w-full mx-auto pt-40">
            <h1 className="text-5xl font-bold text-black mb-4">{ post?.title }</h1>
            <p className="font-bold">{ new Date(post?._createdAt).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }) }</p>

            <Image src={ urlFor(post?.mainImage).url() } alt={ post.author?.name } width={ 800 } height={ 800 } priority />

            <div className="text-2xl mt-10">
                {/* 
                // @ts-ignore */}
                <PortableText value={ post?.body } components={ RichTextComponents } />
            </div>

            {/* <div>
                { post.gallery.images.map((spec: { key: string, value: string }, index) => (
                    <tr key={ index }>
                        <td>{ spec.key }</td>
                        <td>{ spec.value }</td>                                    
                    </tr> 
                ))} 
            </div> */}

            <div className="mb-20">
                <Link href="/" className="bg-[#ccc] text-lg mt-10 text-gray inline-block py-3 px-14 rounded-lg hover:text-white">Voltar</Link>
            </div>
        </div>
    )
}
