import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import category from './schemas/category'
import post from './schemas/post'
import proposal from './schemas/proposal'
import contact from './schemas/contact'
import job from './schemas/job'
import rating from './schemas/rating'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, category, blockContent, proposal, contact, job, rating]
}
