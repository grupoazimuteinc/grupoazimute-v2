'use client'

import { groq } from 'next-sanity'
import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/urlFor'
import { ClientRoute } from '@/components/client-route'
import { getCategoryCssClass } from '@/utils/category-colors'
import Image from 'next/image'
import Link from 'next/link'

interface LatestPostsCompanyProps {
  companyCategory: string
  companyName: string
  companyColor: string
}

export function LatestPostsCompany({ companyCategory, companyName, companyColor }: LatestPostsCompanyProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLatestPosts = async () => {
      if (!client) {
        console.error('Sanity client not available')
        setLoading(false)
        return
      }

      try {
        const query = groq`
          *[_type=='post' && references(*[_type=='category' && title=='${companyCategory}']._id)] {
            _id,
            title,
            slug,
            mainImage,
            publishedAt,
            categories[]->{
              _id,
              title
            }
          } | order(publishedAt desc)[0...8]
        `
        const result = await client.fetch(query)
        setPosts(result)
      } catch (error) {
        console.error('Error fetching latest posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestPosts()
  }, [companyCategory])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Últimas Publicações da {companyName}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fique por dentro das novidades e projetos da {companyName}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return null // Não exibe a seção se não há posts
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Últimas Publicações da {companyName}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fique por dentro das novidades e projetos da {companyName}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {posts.map((post) => (
            <ClientRoute key={post._id} route={`/blog/${post.slug.current}`}>
              <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                {/* Imagem do post */}
                <div className="relative h-48 overflow-hidden">
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                
                {/* Conteúdo do post */}
                <div className="p-6">
                  {/* Categorias */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="mb-3">
                      {post.categories.map((category) => (
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
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
        
        <div className="text-center">
          <Link 
            href="/blog"
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg ${companyColor}`}
          >
            Ver Todas as Notícias
            <svg 
              className="ml-2 w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
