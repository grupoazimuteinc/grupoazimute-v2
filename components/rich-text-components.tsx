import Image from 'next/image'
import Link from 'next/link'

import ReactPlayer from 'react-player';

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
    }
}
