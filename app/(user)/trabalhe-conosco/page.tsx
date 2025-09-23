import { getPageMetadata } from '@/lib/metadata'
import TrabalheConoscoClient from './trabalhe-conosco-client'

export const metadata = getPageMetadata('trabalheConosco')

export default function TrabalheConosco() {
    return <TrabalheConoscoClient />
}