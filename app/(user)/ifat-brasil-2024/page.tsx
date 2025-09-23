import { getPageMetadata } from '@/lib/metadata'
import IfatBrasil2024Client from './ifat-brasil-2024-client'

export const metadata = getPageMetadata('ifatBrasil2024')

export default function IfatBrasil2024() {
    return <IfatBrasil2024Client />
}
