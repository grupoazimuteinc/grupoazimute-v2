'use client'

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { dashboardNavGroups } from '@/config/dashboard-nav'

function isActive(pathname: string, href: string): boolean {
  if (href === '/dashboard') {
    return pathname === '/dashboard'
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

export function DashboardSidebar() {
  const pathname = usePathname() ?? ''

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar__brand">
        <span className="dashboard-sidebar__eyebrow">Grupo Azimute</span>
        <strong className="dashboard-sidebar__title">Dashboard</strong>
      </div>

      <nav className="dashboard-sidebar__nav">
        {dashboardNavGroups.map((group) => (
          <div key={group.label} className="dashboard-sidebar__group">
            <span className="dashboard-sidebar__group-label">{group.label}</span>
            <ul className="dashboard-sidebar__list">
              {group.items.map((item) => {
                const active = isActive(pathname, item.href)

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`dashboard-sidebar__link${active ? ' is-active' : ''}`}
                      title={item.description}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="dashboard-sidebar__footer">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </aside>
  )
}
