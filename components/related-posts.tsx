'use client'

import { groq } from 'next-sanity'
import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/urlFor'
import { ClientRoute } from '@/components/client-route'
import { getCategoryCssClass } from '@/utils/category-colors'
import Image from 'next/image'
import Link from 'next/link'

interface RelatedPostsProps {
  currentPostId: string
  categories: Array<{ _id: string; title: string }>
  limit?: number
}

export function RelatedPosts({ currentPostId, categories, limit = 3 }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!client || !categories.length) {
        setLoading(false)
        return
      }

      try {
        // Buscar posts que compartilham as mesmas categorias, excluindo o post atual
        const categoryIds = categories.map(cat => cat._id)
        
        const query = groq`
          *[_type=='post' && _id != $currentPostId && count(categories[@._ref in $categoryIds]) > 0] {
            _id,
            title,
            slug,
            mainImage,
            publishedAt,
            viewCount,
            categories[]->{
              _id,
              title,
              slug
            }
          } | order(publishedAt desc)[0...$limit]
        `

        const result = await client.fetch(query, { 
          currentPostId, 
          categoryIds, 
          limit 
        })
        
        setRelatedPosts(result)
      } catch (error) {
        console.error('Error fetching related posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedPosts()
  }, [currentPostId, categories, limit])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 mt-12">
        <div className="container">
          <div className="row">
            <div className="w-full">
              {/* Cabeçalho da seção */}
              <div className="text-center mb-12">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 block">Blog</span>
                <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                  Posts Relacionados
                </h2>
                <div className="w-16 h-0.5 bg-gray-300 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(limit)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50 mt-12">
      <div className="container">
        <div className="row">
          <div className="w-full">
            {/* Cabeçalho da seção */}
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 block">Blog</span>
              <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                Posts Relacionados
              </h2>
              <div className="w-16 h-0.5 bg-gray-300 mx-auto"></div>
            </div>

            {/* Grid de posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {relatedPosts.map((post) => (
          <ClientRoute key={post._id} route={`/blog/${post.slug.current}`}>
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
              {/* Imagem do post */}
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Conteúdo do post */}
              <div className="p-6">
                {/* Categorias */}
                {post.categories && post.categories.length > 0 && (
                  <div className="mb-3">
                    {post.categories.slice(0, 2).map((category) => (
                      <span
                        key={category._id}
                        className={`news-tag ${getCategoryCssClass(category.title)}`}
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Título */}
                <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {post.title}
                </h4>
                
                {/* Data */}
                <p className="text-sm text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </article>
          </ClientRoute>
        ))}
            </div>

            {/* Botão para ver todas as publicações */}
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-600/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:border-blue-500 shadow-lg"
              >
                Ver Todas as Publicações
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
