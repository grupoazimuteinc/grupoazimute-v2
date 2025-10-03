

import Link from 'next/link'
import Image from 'next/image'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import YouTube from 'react-youtube';
import { Metadata } from 'next';

import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/urlFor'
import { RichTextComponents } from '@/components/rich-text-components'
import { ShareButtons } from '@/components/share-buttons'
import { RelatedPosts } from '@/components/related-posts'
import { useEffect } from 'react';
import Fancybox from '@/components/images-gallery';




type Props = {
    params: {
        slug: string;
    };
};


type Post = {
    _id: string;
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
    categories?: Array<{ _id: string; title: string }>;
    description?: string;
};


export const revalidate = 60
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
    if (!client) {
        return {
            title: 'Post não encontrado - Grupo Azimute',
            description: 'O post que você está procurando não existe ou foi removido.',
        };
    }

    const query = groq`
        *[_type=='post' && slug.current == $slug][0] {
            title,
            description,
            mainImage,
            _createdAt,
            author->{name}
        }
    `;

    const post = await client.fetch(query, { slug });

    if (!post) {
        return {
            title: 'Post não encontrado - Grupo Azimute',
            description: 'O post que você está procurando não existe ou foi removido.',
        };
    }

    return {
        title: `${post.title} - Grupo Azimute`,
        description: post.description || `Leia mais sobre ${post.title} no blog do Grupo Azimute.`,
        openGraph: {
            title: `${post.title} - Grupo Azimute`,
            description: post.description || `Leia mais sobre ${post.title} no blog do Grupo Azimute.`,
            type: 'article',
            publishedTime: post._createdAt,
            authors: post.author?.name ? [post.author.name] : ['Grupo Azimute'],
            images: post.mainImage ? [urlFor(post.mainImage).url()] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${post.title} - Grupo Azimute`,
            description: post.description || `Leia mais sobre ${post.title} no blog do Grupo Azimute.`,
            images: post.mainImage ? [urlFor(post.mainImage).url()] : [],
        },
    };
}

export default async function Post({ params: { slug } }: Props) {
    if (!client) {
        return (
            <div className="max-w-[800px] w-full mx-auto pt-40 smartphone:px-[15px] smartphone:max-w-full smartphone:pt-32">
                <h1 className="text-5xl font-bold text-black mb-4 smartphone:text-xl">Configuração não encontrada</h1>
                <p className="text-lg mb-10">As configurações do Sanity não estão disponíveis. Verifique as variáveis de ambiente.</p>
                <Link href="/" className="bg-[#ccc] text-lg mt-10 text-gray inline-block py-3 px-14 rounded-lg hover:text-white">Voltar</Link>
            </div>
        )
    }

    const query = groq`
        *[_type=='post' && slug.current == $slug][0] {
            ...,
            categories[]->{
                _id,
                title
            }
        }
    `

    console.log("Executando consulta com o slug:", slug); // Adiciona console.log para o slug usado na consulta

    const post: Post = await client.fetch(query, { slug })
    console.log("Post recuperado:", post); // Adiciona console.log para o post recuperado da consulta

    if (!post) {
        return (
            <div className="max-w-[800px] w-full mx-auto pt-40 smartphone:px-[15px] smartphone:max-w-full smartphone:pt-32">
                <h1 className="text-5xl font-bold text-black mb-4 smartphone:text-xl">Post não encontrado</h1>
                <p className="text-lg mb-10">O post que você está procurando não existe ou foi removido.</p>
                <Link href="/" className="bg-[#ccc] text-lg mt-10 text-gray inline-block py-3 px-14 rounded-lg hover:text-white">Voltar</Link>
            </div>
        )
    }

    console.log("Dados da galeria:", post.gallery);

    // const images = [
    //     { id: 60, url: '/public/images/footer.png', thumbnailUrl: '/public/images/footer.png' },
    //     { id: 61, url: '/public/images/ifat-background.jpg', thumbnailUrl: '/public/images/ifat-background.jpg' },
    //     { id: 62, url: '/public/images/ifat-logo.jpg', thumbnailUrl: '/public/images/ifat-logo.jpg' },
    //     { id: 63, url: '/public/images/selos-azimute.png', thumbnailUrl: '/public/images/selos-azimute.png' },
    // ];

    return (
        <div className="max-w-[800px] w-full mx-auto pt-40 smartphone:px-[15px] smartphone:max-w-full smartphone:pt-32">
            <h1 className="text-5xl font-bold text-black mb-4 smartphone:text-xl">{ post?.title }</h1>
            <p className="font-bold smartphone:text-base">{ new Date(post?._createdAt).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }) }</p>

            <Image src={ urlFor(post?.mainImage).url() } alt={post.author?.name !== undefined ? post.author?.name : ''} width={ 800 } height={ 800 } priority />

            <div className="text-2xl mt-10 smartphone:text-base">
                {/* 
                // @ts-ignore */}
                <PortableText value={ post?.body } components={ RichTextComponents } />
            </div>

            {post?.urlVideo && 
                <iframe width="100%" src={`https://www.youtube.com/embed/${post.urlVideo}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" style={{aspectRatio: '16/9'}}></iframe>
            }

            <Fancybox
                options={{
                Carousel: {
                    infinite: true,
                },
                }}
            >
                <div className="grid grid-cols-4 gap-[30px] smartphone:grid-cols-2 smartphone:gap-3">
                    {post.gallery?.images?.map((image,index) => (
                        <a key={index} href={urlFor(image).url()} data-fancybox="gallery">
                            <Image width={800} height={800} src={urlFor(image).url()} alt="" />
                        </a>
                    ))}
                </div>
            </Fancybox>

            {/* Botões de compartilhamento */}
            <ShareButtons 
                title={post.title}
                url={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://grupoazimute.com.br'}/blog/${slug}`}
                description={post.description}
            />

            {/* Posts relacionados */}
            {post.categories && post.categories.length > 0 && (
                <RelatedPosts 
                    currentPostId={post._id}
                    categories={post.categories}
                    limit={3}
                />
            )}

            <div className="mb-20">
                <Link href="/" className="bg-[#ccc] text-lg mt-10 text-gray inline-block py-3 px-14 rounded-lg hover:text-white">Voltar</Link>
            </div>
        </div>
    )
}