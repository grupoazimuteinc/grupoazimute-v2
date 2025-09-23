import { getPageMetadata } from '@/lib/metadata'
import NoticiasClient from './noticias-client'

export const revalidate = 60;
export const metadata = getPageMetadata('noticias');

export default function Noticias() {
    return <NoticiasClient />
}






