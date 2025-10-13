import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Publicações',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem destaque',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
        }
      ]
    }),
    defineField({
      name: 'categories',
      title: 'Categorias',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
    }),
    defineField({
      name: 'viewCount',
      title: 'Contador de Visualizações',
      type: 'number',
      initialValue: 0,
      readOnly: true,
      description: 'Número de visualizações do post (atualizado automaticamente)',
    }),
    defineField({
      name: 'body',
      title: 'Texto',
      type: 'blockContent',
    }),

    defineField({
      name: 'urlVideo',
      title: 'URL do vídeo',
      type: 'string'
    }),

    defineField({
      name: 'gallery',
      title: 'Galeria de Imagens',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'images',
          title: 'Imagens',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }), 
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    }
  },
})
