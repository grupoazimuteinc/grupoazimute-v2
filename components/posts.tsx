import Image from 'next/image'

import { urlFor } from '@/lib/urlFor'

import { ClientRoute } from '@/components/client-route'

type Props = {
    posts: Post[]
}

export function Posts({ posts }: Props) {
    
    return(
        <div className="grid grid-cols-4 gap-5 smartphone:px-[15px] smartphone:grid-cols-1 tablet:grid-cols-2 tablet:px-[15px] monitor:px-[15px] header-space:grid-cols-3">
            { posts.map(post => (
                <ClientRoute key={ post._id } route={ `/blog/${ post.slug.current }` }>
                    <div className="box-news">
                        <div className="news-image">
                            <Image 
                                src={ urlFor(post.mainImage).url() }
                                alt={ post._id }
                                width={486}
                                height={440}
                                className="w-full h-full object-contain" 
                            />
                        </div>
                        
                        <div>
                            { post.categories?.map(category => ( 
                                <span key={ category._id } className={ `news-tag ${ category.title }` }>{ category.title }</span> 
                            )) }
                        </div>
                        <span className="news-title line-clamp-2">{ post.title }</span>
                        <span className="news-date">{ new Date(post.publishedAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) }</span>
                    </div>
                </ClientRoute>
            )) }
        </div>
    )
}