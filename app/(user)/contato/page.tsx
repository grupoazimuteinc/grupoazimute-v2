import { getPageMetadata } from '@/lib/metadata'
import ContatoClient from './contato-client'

export const metadata = getPageMetadata('contato')

export default function Contato() {
    return <ContatoClient />
}