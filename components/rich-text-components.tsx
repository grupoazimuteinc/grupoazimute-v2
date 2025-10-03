import Image from 'next/image'

import { urlFor } from '@/lib/urlFor'

const VideoBlock = ({ node }:any) => {
    if (!node || !node.urlVideo) {
      return null;
    }
    return (
      <div>
        <video controls>
          <source src={node.urlVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };


export const RichTextComponents = {
    
    types: {
        image: ({ value }: any) => {
            return (
                <div>
                    <Image src={ urlFor(value).url() } className="" alt="" width={ 500 } height={ 500 } />
                </div>
            )
        },
        video: VideoBlock,
    },
    list: {
        bullet: ({ children }: any) => {
            return <ul className="list-disc list-inside mb-4 text-lg smartphone:text-base">{ children }</ul>
        },
        number: ({ children }: any) => {
            return <ol className="list-decimal list-inside mb-4 text-lg smartphone:text-base">{ children }</ol>
        }
    },
    block: {
        h1: ({ children }: any) => {
            return <h1 className="text-4xl font-bold mb-4 mt-6">{ children }</h1>
        },
        h2: ({ children }: any) => {
            return <h2 className="text-3xl font-bold mb-3 mt-5">{ children }</h2>
        },
        h3: ({ children }: any) => {
            return <h3 className="text-2xl font-semibold mb-2 mt-4">{ children }</h3>
        },
        h4: ({ children }: any) => {
            return <h4 className="text-xl font-semibold mb-2 mt-3">{ children }</h4>
        },
        blockquote: ({ children }: any) => {
            return <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-lg smartphone:text-base">{ children }</blockquote>
        },
        normal: ({ children }: any) => {
            return <p className="mb-4 text-lg smartphone:text-base">{ children }</p>
        }
    },
    marks: {
        strong: ({ children }: any) => {
            return <strong className="font-bold">{ children }</strong>
        },
        em: ({ children }: any) => {
            return <em className="italic">{ children }</em>
        },
        underline: ({ children }: any) => {
            return <span className="underline">{ children }</span>
        },
        'strike-through': ({ children }: any) => {
            return <span className="line-through">{ children }</span>
        },
        link: ({ children, value }: any) => {
            const target = value.blank ? '_blank' : '_self'
            const rel = value.blank ? 'noopener noreferrer' : ''
            return (
                <a 
                    href={value.href} 
                    target={target} 
                    rel={rel}
                    className="text-blue-600 hover:text-blue-800 underline"
                >
                    { children }
                </a>
            )
        }
    }
}
