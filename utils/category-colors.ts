// Mapeamento de cores das categorias das empresas (baseado no globals.css)
export const getCategoryColor = (categoryTitle: string) => {
  const colorMap: { [key: string]: string } = {
    'san': 'bg-sky-500 text-white', // #0086c8
    'tech': 'bg-red-600 text-white', // #E2243D
    'engenharia': 'bg-green-600 text-white', // #50A275
    'imoveis': 'bg-blue-800 text-white', // #1E5285
    'aria': 'bg-orange-600 text-white', // #e25b15
    'grupo': 'bg-gray-700 text-white' // #313131
  }
  return colorMap[categoryTitle.toLowerCase()] || 'bg-gray-700 text-white'
}

// Mapeamento de cores para CSS classes (usado no globals.css)
export const getCategoryCssClass = (categoryTitle: string) => {
  const cssClassMap: { [key: string]: string } = {
    'san': 'san',
    'tech': 'tech', 
    'engenharia': 'engenharia',
    'imoveis': 'imoveis',
    'aria': 'aria',
    'grupo': 'grupo'
  }
  return cssClassMap[categoryTitle.toLowerCase()] || 'grupo'
}

// Mapeamento de classes CSS para filtros do blog
export const getCategoryFilterClass = (categoryTitle: string) => {
  const cssClassMap: { [key: string]: string } = {
    'san': 'san',
    'tech': 'tech', 
    'engenharia': 'engenharia',
    'imoveis': 'imoveis',
    'aria': 'aria',
    'grupo': 'grupo'
  }
  return cssClassMap[categoryTitle.toLowerCase()] || 'grupo'
}

// Mapeamento de nomes amigáveis das categorias
export const getCategoryDisplayName = (categoryTitle: string) => {
  const nameMap: { [key: string]: string } = {
    'san': 'Azimute San',
    'tech': 'Azimute Tech',
    'engenharia': 'Azimute Engenharia',
    'imoveis': 'Azimute Imóveis',
    'aria': 'Aria Imagem e Tecnologia',
    'grupo': 'Grupo Azimute'
  }
  return nameMap[categoryTitle.toLowerCase()] || categoryTitle
}
