import { getPageMetadata } from '@/lib/metadata'
import PesquisaDeSatisfacaoClient from './pesquisa-de-satisfacao-client'

export const metadata = getPageMetadata('pesquisaSatisfacao')

export default function PesquisaDeSatisfacao() {
    return <PesquisaDeSatisfacaoClient />
}