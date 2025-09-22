type Base = {
    _createdAt: string
    _id: string
    _dev: string
    _type: string
    _updatedAt: string
}

interface Post extends Base {
    author: Author
    body: Block[]
    categories: Category[]
    mainImage: Image
    slug: Slug
    title: string
    description: string
    publishedAt: string
}

interface Image {
    _type: 'image'
    asset: Reference
}

interface Reference {
    _ref: string
    _type: 'reference'
}

interface Slug {
    _type: 'slug'
    current: string
}

interface Block {
    _key: string
    _type: 'block'
    children: Span[]
    markDefs: any[]
    style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
}

interface Span {
    _key: string
    _type: 'span'
    marks: string[]
    text: string
}

interface Category extends Base {
    description: string
    title: string
}

interface MainImage {
    _type: 'image'
    asset: Reference
}

interface Title {
    _type: 'string'
    current: string
}

interface EventFormInput {
    name: string
    label: string
    type: string
    mask?: string
    required: boolean
    options?: EventFormInputOptions[];
}

interface EventFormInputOptions { 
    value?: string; 
    label?: string; 
}

// Bitrix24 type definitions
declare global {
    interface Window {
        BX24?: any;
    }
}