import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

// Only create client if environment variables are available
export const client = projectId && dataset ? createClient({
  projectId,
  dataset,
  apiVersion: '2023-07-31', 
  useCdn: true
}) : null