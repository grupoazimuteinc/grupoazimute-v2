'use client'

import { useState, useEffect } from 'react'
import { groq } from 'next-sanity'
import { client } from '@/lib/sanity.client'
import { getCategoryFilterClass, getCategoryDisplayName } from '@/utils/category-colors'

interface Category {
  _id: string
  title: string
  description?: string
}

interface BlogFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function BlogFilters({ selectedCategory, onCategoryChange }: BlogFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      if (!client) {
        console.error('Sanity client not available')
        setLoading(false)
        return
      }

      try {
        const query = groq`
          *[_type=='category'] | order(title asc)
        `
        const result = await client.fetch(query)
        setCategories(result)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])


  if (loading) {
    return (
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded-full w-20"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {/* Botão "Todos" */}
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
          }`}
        >
          Todas
        </button>

        {/* Botões das categorias na ordem especificada */}
        {['grupo', 'engenharia', 'imoveis', 'tech', 'san', 'aria'].map((categoryTitle) => {
          const category = categories.find(cat => cat.title === categoryTitle);
          if (!category) return null;
          
          return (
            <button
              key={category._id}
              onClick={() => onCategoryChange(category.title)}
              className={`blog-filter ${getCategoryFilterClass(category.title)} ${
                selectedCategory === category.title
                  ? 'shadow-md'
                  : ''
              }`}
            >
              {getCategoryDisplayName(category.title)}
            </button>
          );
        })}
      </div>
    </div>
  )
}
