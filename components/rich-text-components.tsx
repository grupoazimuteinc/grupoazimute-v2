import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '@/lib/urlFor'

export const RichTextComponents = {
    types: {
        image: ({ value }: any) => {
            return (
                <div>
                    <Image src={ urlFor(value).url() } className="" alt="" width={ 500 } height={ 500 } />
                </div>
            )
        }
    },
    list: {
        bullet: ({ children }: any) => {
            <ul className="">{ children }</ul>
        },
        number: ({ children }: any) => {
            <ol className="">{ children }</ol>
        }
    },
    block: {
        h1: ({ children }: any) => {
            <h1>{ children }</h1>
        },
        h2: ({ children }: any) => {
            <h2>{ children }</h2>
        },
        h3: ({ children }: any) => {
            <h3>{ children }</h3>
        },
        h4: ({ children }: any) => {
            <h4>{ children }</h4>
        },
        blockquote: ({ children }: any) => {
            <blockquote className="">{ children }</blockquote>
        }
    },
    marks: {
        link: ({ children, value }: any) => {
            const rel = !value.href.startsWith('/')
                ? 'noreferrer noopener'
                : undefined

            return (
                <Link href={ value.href } rel={ rel } className="">{ children }</Link>
            ) 
        }
    }
}