

import Link from 'next/link'
import Image from 'next/image'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import YouTube from 'react-youtube';


import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/urlFor'
import { RichTextComponents } from '@/components/rich-text-components'
import { useEffect } from 'react';
import Fancybox from '@/components/images-gallery';




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

    // const images = [
    //     { id: 60, url: '/public/images/footer.png', thumbnailUrl: '/public/images/footer.png' },
    //     { id: 61, url: '/public/images/ifat-background.jpg', thumbnailUrl: '/public/images/ifat-background.jpg' },
    //     { id: 62, url: '/public/images/ifat-logo.jpg', thumbnailUrl: '/public/images/ifat-logo.jpg' },
    //     { id: 63, url: '/public/images/selos-azimute.png', thumbnailUrl: '/public/images/selos-azimute.png' },
    // ];

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

            {post?.urlVideo && 
                <iframe width="100%" src={`https://www.youtube.com/embed/${post.urlVideo}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" style={{aspectRatio: '16/9'}}></iframe>
            }

            
                {/* {post.gallery && post.gallery.images.map((image, index) => {
                    console.log("URL da imagem:", urlFor(image).url());
                    return (
                        <Fancybox key={index}>
                            <a href={urlFor(image).url()} className="fancybox">
                                <Image width={800} height={800} src={urlFor(image).url()} alt={`Imagem ${index + 1}`} className="w-full h-full object-cover" />
                            </a>
                        </Fancybox>
                        
                    );
                })} */}
                <Fancybox
                    options={{
                    Carousel: {
                        infinite: false,
                    },
                    }}
                >
                    {/* {images.map((image) => (
                        <a key={image.id} data-fancybox="gallery" href={image.url}>
                        <Image alt="" src={image.thumbnailUrl} width={200} height={150} />
                        </a>
                    ))} */}
                    <div className="grid grid-cols-4 gap-[30px]">

                        {post.gallery?.images.map((image,index) => (
                            <a key={index} href={urlFor(image).url()} data-fancybox="gallery">
                                <Image width={800} height={800} src={urlFor(image).url()} alt="" />
                            </a>
                        ))}
                    </div>
                </Fancybox>

            <div className="mb-20">
                <Link href="/" className="bg-[#ccc] text-lg mt-10 text-gray inline-block py-3 px-14 rounded-lg hover:text-white">Voltar</Link>
            </div>
        </div>
    )
}