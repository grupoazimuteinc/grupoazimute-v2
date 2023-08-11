'use client'

import Link from 'next/link'

export function ClientRoute({ children, route }: { children: React.ReactNode, route: string }) {
    return (
        <Link href={ route }>{ children }</Link>
    )
}