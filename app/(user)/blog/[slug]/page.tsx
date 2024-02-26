function getPostVideoId(videoUrl:any) {
    if (videoUrl && videoUrl.includes('youtube.com/watch?v=')) {
        return videoUrl.split('v=')[1];
    } else {
        return videoUrl;
    }
}

import Link from 'next/link'
import Image from 'next/image'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'

import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/urlFor'
import { RichTextComponents } from '@/components/rich-text-components'


type Props = {
    params: {
        slug: string;
    };
};


type Post = {
    title: string;
    _createdAt: string;
    mainImage: { url: string }; 
    author?: { name: string }; 
    body?: any; 
    gallery?: {
        images: Array<{ url: string }>;
    };
    urlVideo: string;
    
    alt: string;

};

export const revalidate = 60

export default async function Post({ params: { slug } }: Props) {
    const query = groq`
        *[_type=='post' && slug.current == $slug][0] {
            ...,
            categories[]->
        }
    `

    console.log("Executando consulta com o slug:", slug); // Adiciona console.log para o slug usado na consulta

    const post: Post = await client.fetch(query, { slug })
    console.log("Post recuperado:", post); // Adiciona console.log para o post recuperado da consulta

    console.log("Dados da galeria:", post.gallery);


    return (
        <div className="max-w-[800px] w-full mx-auto pt-40">
            <h1 className="text-5xl font-bold text-black mb-4">{ post?.title }</h1>
            <p className="font-bold">{ new Date(post?._createdAt).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }) }</p>

            <Image src={ urlFor(post?.mainImage).url() } alt={post.author?.name !== undefined ? post.author?.name : ''} width={ 800 } height={ 800 } priority />

            <div className="text-2xl mt-10">
                {/* 
                // @ts-ignore */}
                <PortableText value={ post?.body } components={ RichTextComponents } />
            </div>

            <div className="text-base">
                <span>Ver vídeo: <a href={`https://www.youtube.com/watch?v=${getPostVideoId(post.urlVideo)}`} target="_blank">{`${getPostVideoId(post.urlVideo)}`}</a></span>
            </div>

            {post.gallery && post.gallery.images.map((image, index) => {
                console.log("URL da imagem:", urlFor(image).url());
                return (
                    <div key={index}>
                        <Image src={urlFor(image).url()} alt={`Imagem ${index + 1}`} className="w-full h-auto" />
                    </div>
                );
            })}



            <div className="mb-20">
                <Link href="/" className="bg-[#ccc] text-lg mt-10 text-gray inline-block py-3 px-14 rounded-lg hover:text-white">Voltar</Link>
            </div>
        </div>
    )
}
