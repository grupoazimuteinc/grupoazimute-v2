import { getPageMetadata } from '@/lib/metadata';
import BlogClient from './blog-client';

export const revalidate = 60;
export const metadata = getPageMetadata('blog');

export default function Blog() {
    return <BlogClient />;
}
