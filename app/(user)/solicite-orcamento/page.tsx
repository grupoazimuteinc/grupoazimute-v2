import { getPageMetadata } from '@/lib/metadata'
import SoliciteOrcamentoClient from './solicite-orcamento-client'

export const metadata = getPageMetadata('soliciteOrcamento')

export default function SoliciteOrcamento() {
    return <SoliciteOrcamentoClient />
}