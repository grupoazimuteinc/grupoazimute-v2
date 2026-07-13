export interface DashboardNavItem {
  label: string
  href: string
  description?: string
}

export interface DashboardNavGroup {
  label: string
  items: DashboardNavItem[]
}

export const dashboardNavGroups: DashboardNavGroup[] = [
  {
    label: 'Principal',
    items: [
      {
        label: 'Visão geral',
        href: '/dashboard',
        description: 'Resumo e dados conectados via MCP',
      },
    ],
  },
  {
    label: 'Tools',
    items: [
      {
        label: 'Assinaturas de E-mail',
        href: '/dashboard/tools/assinaturas',
        description: 'Gerencie assinaturas dos colaboradores',
      },
    ],
  },
]
