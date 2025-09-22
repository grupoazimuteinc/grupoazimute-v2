# Documentação de Metadata - Grupo Azimute

## Resumo da Implementação

O projeto Grupo Azimute implementa um sistema completo de metadata para SEO utilizando a API de Metadata do Next.js 13+. Todas as páginas estão configuradas corretamente com metadata específico para otimização de mecanismos de busca.

## Estrutura do Sistema de Metadata

### 1. Arquivo Central de Configuração (`lib/metadata.ts`)

O arquivo `lib/metadata.ts` contém toda a configuração centralizada de metadata:

- **`siteConfig`**: Configurações globais do site
- **`pageMetadata`**: Metadados específicos para cada página
- **`generateMetadata`**: Função para gerar metadata dinâmico
- **`getPageMetadata`**: Função helper para recuperar metadata de páginas específicas

### 2. Configurações Globais (`siteConfig`)

```typescript
export const siteConfig = {
  name: 'Grupo Azimute',
  title: 'Grupo Azimute - Soluções Integradas de Engenharia',
  description: 'Grupo formado pelas empresas Azimute Engenharia, Azimute Imóveis, Azimute Tech, Azimute San e Aria. Mais de três décadas de atuação no ramo da engenharia civil com soluções integradas e inovadoras.',
  url: 'https://grupoazimute.com.br',
  ogImage: 'https://grupoazimute.com.br/images/grupo-azimute.png',
  keywords: [
    'engenharia civil', 'construção', 'imóveis', 'saneamento', 'tecnologia',
    'inspeção', 'meio ambiente', 'grupo azimute', 'azimute engenharia',
    'azimute imóveis', 'azimute tech', 'azimute san', 'aria imagem e tecnologia',
    'projetos de engenharia', 'consultoria técnica', 'gestão de projetos',
    'sustentabilidade', 'inovação tecnológica'
  ],
  // ... outras configurações
}
```

### 3. Layout Principal (`app/(user)/layout.tsx`)

O layout principal implementa metadata global que serve como base para todas as páginas:

```typescript
export const metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  // ... outras configurações globais
}
```

## Páginas com Metadata Implementado

### 1. Página Inicial (`app/(user)/page.tsx`)
- **Metadata**: `getPageMetadata('home')`
- **Título**: "Grupo Azimute - Soluções Integradas de Engenharia"
- **Descrição**: Descrição completa do grupo e suas empresas
- **Keywords**: Engenharia civil, construção, imóveis, saneamento, tecnologia

### 2. Azimute Engenharia (`app/(user)/azimute-engenharia/page.tsx`)
- **Metadata**: `getPageMetadata('azimuteEngenharia')`
- **Título**: "Azimute Engenharia - Projetos e Construções"
- **Descrição**: Especializada em projetos de engenharia civil, construção e gestão de obras
- **Keywords**: Engenharia civil, projetos, construção, obras, empreendimentos

### 3. Azimute Imóveis (`app/(user)/azimute-imoveis/page.tsx`)
- **Metadata**: `getPageMetadata('azimuteImoveis')`
- **Título**: "Azimute Imóveis - Venda e Locação de Imóveis"
- **Descrição**: Corretora especializada em venda, locação e administração de imóveis
- **Keywords**: Imóveis, venda, locação, corretora, investimentos

### 4. Azimute Tech (`app/(user)/azimute-tech/page.tsx`)
- **Metadata**: `getPageMetadata('azimuteTech')`
- **Título**: "Azimute Tech - Inspeção e Tecnologia"
- **Descrição**: Especializada em inspeções técnicas, laudos periciais e soluções tecnológicas
- **Keywords**: Inspeção técnica, laudos periciais, tecnologia, qualidade, perícia

### 5. Azimute San (`app/(user)/azimute-san/page.tsx`)
- **Metadata**: `getPageMetadata('azimuteSan')`
- **Título**: "Azimute San - Saneamento e Meio Ambiente"
- **Descrição**: Especializada em projetos de saneamento básico, tratamento de água e esgoto
- **Keywords**: Saneamento, meio ambiente, tratamento de água, esgoto, sustentabilidade

### 6. Aria (`app/(user)/aria/page.tsx`)
- **Metadata**: `getPageMetadata('aria')`
- **Título**: "Aria - Imagem e Tecnologia"
- **Descrição**: Especializada em soluções de imagem e tecnologia para a construção civil
- **Keywords**: Drones, fotogrametria, imagem, tecnologia, mapeamento

### 7. Contato (`app/(user)/contato/page.tsx`)
- **Metadata**: `getPageMetadata('contato')`
- **Título**: "Contato - Grupo Azimute"
- **Descrição**: Entre em contato com o Grupo Azimute para suas necessidades
- **Keywords**: Contato, atendimento, orçamento, proposta

### 8. Solicite Orçamento (`app/(user)/solicite-orcamento/page.tsx`)
- **Metadata**: `getPageMetadata('soliciteOrcamento')`
- **Título**: "Solicite seu Orçamento - Grupo Azimute"
- **Descrição**: Solicite um orçamento personalizado para seus projetos
- **Keywords**: Orçamento, proposta, cotação, projeto

### 9. Trabalhe Conosco (`app/(user)/trabalhe-conosco/page.tsx`)
- **Metadata**: `getPageMetadata('trabalheConosco')`
- **Título**: "Trabalhe Conosco - Grupo Azimute"
- **Descrição**: Faça parte da equipe do Grupo Azimute
- **Keywords**: Trabalhe conosco, vagas, carreira, oportunidades

### 10. Pesquisa de Satisfação (`app/(user)/pesquisa-de-satisfacao/page.tsx`)
- **Metadata**: `getPageMetadata('pesquisaSatisfacao')`
- **Título**: "Pesquisa de Satisfação - Grupo Azimute"
- **Descrição**: Participe da nossa pesquisa de satisfação
- **Keywords**: Pesquisa, satisfação, avaliação, feedback

### 11. Blog (`app/(user)/blog/page.tsx`)
- **Metadata**: `getPageMetadata('blog')`
- **Título**: "Blog - Grupo Azimute"
- **Descrição**: Acompanhe as últimas notícias, tendências e insights do mercado
- **Keywords**: Blog, notícias, tendências, insights, mercado

### 12. Notícias (`app/(user)/noticias/page.tsx`)
- **Metadata**: `getPageMetadata('noticias')`
- **Título**: "Notícias - Grupo Azimute"
- **Descrição**: Fique por dentro das principais notícias do setor
- **Keywords**: Notícias, atualidades, mercado, setor

### 13. IFAT Brasil 2024 (`app/(user)/ifat-brasil-2024/page.tsx`)
- **Metadata**: `getPageMetadata('ifatBrasil2024')`
- **Título**: "IFAT Brasil 2024 - Grupo Azimute"
- **Descrição**: O Grupo Azimute participa da IFAT Brasil 2024
- **Keywords**: IFAT brasil, feira, saneamento, meio ambiente, evento

### 14. Posts do Blog (`app/(user)/blog/[slug]/page.tsx`)
- **Metadata**: `generateMetadata` (dinâmico)
- **Implementação**: Metadata gerado dinamicamente baseado no conteúdo do post
- **Características**: Título, descrição, Open Graph e Twitter Cards específicos para cada post

## Recursos de SEO Implementados

### 1. Open Graph
- Configuração completa para redes sociais
- Imagens otimizadas (1200x630px)
- Títulos e descrições específicas
- Locale configurado para pt_BR

### 2. Twitter Cards
- Configuração para Twitter
- Imagens otimizadas
- Títulos e descrições específicas
- Creator configurado (@grupoazimute)

### 3. Robots
- Configuração para mecanismos de busca
- Indexação e follow habilitados
- Configurações específicas para Google Bot
- Max video preview, image preview e snippet configurados

### 4. Verificação de Sites
- Google Search Console
- Yandex
- Yahoo

### 5. Dublin Core
- Metadados estruturados para bibliotecas digitais
- Informações de geolocalização (Brasil)
- Classificação e categorização

### 6. Canonical URLs
- URLs canônicas configuradas
- Prevenção de conteúdo duplicado

## Status da Implementação

✅ **Todas as páginas estão implementadas corretamente**
✅ **Metadata dinâmico funcionando para posts do blog**
✅ **Configurações globais aplicadas consistentemente**
✅ **SEO otimizado para mecanismos de busca**
✅ **Redes sociais configuradas (Open Graph e Twitter)**
✅ **Estrutura de dados rica implementada**

## Conclusão

O sistema de metadata do Grupo Azimute está completamente implementado e atualizado. Todas as páginas possuem metadata específico e otimizado para SEO, garantindo uma boa visibilidade nos mecanismos de busca e uma experiência consistente nas redes sociais.

A implementação segue as melhores práticas do Next.js 13+ e está preparada para futuras atualizações e expansões do site.
