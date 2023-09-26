import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'rating',
  title: 'Pesquisas de Satisfação',
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
        name: 'phone',
        title: 'Telefone',
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
