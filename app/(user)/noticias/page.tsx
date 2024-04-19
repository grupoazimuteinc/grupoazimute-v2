
import { groq } from 'next-sanity'
import { client } from '@/lib/sanity.client'
import { Posts } from '@/components/posts'

const query = groq`
  *[_type=='post'] {
    ...,
    categories[]->
  } | order(publishedAt desc)
`

export const revalidate = 60

export default async function Noticias() {
    const posts = await client.fetch(query)

    return (
        <>
            <main>
                <div className="content o-grupo pt-[175px] smartphone:pt-[120px]">
                    <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 text-left">
                        <h2 className="text-3xl text-[#6A696A] font-bold p-0 mb-[15px] smartphone:text-xl">Fique por dentro</h2>
                        <p className="smartphone:mb-0">Saiba as últimas informações relacionadas aos segmentos do grupo.</p>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="container pb-24 smartphone:pb-[20px] monitor:pb-10">
                    <div className="row">
                    <Posts posts={ posts } />
                    </div>
                </div> 
                </main>
        </>
    )
}