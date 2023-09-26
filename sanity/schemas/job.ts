import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'job',
  title: 'Currículos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string'
    }),
    defineField({
        name: 'email',
        title: 'E-mail',
        type: 'string'
    }),
    defineField({
        name: 'linkedin',
        title: 'Linkedin',
        type: 'string'
    }),
    defineField({
        name: 'file',
        title: 'URL do arquivo',
        type: 'string'
    }),
    defineField({
        name: 'categories',
        title: 'Categorias',
        type: 'array',
        of: [{type: 'reference', to: {type: 'category'}}]
    }),
    defineField({
      name: 'message',
      title: 'Mensagem',
      type: 'blockContent'
    })
  ]
})
