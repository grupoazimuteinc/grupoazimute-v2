# Grupo Azimute v3.1.1

## Novas Funcionalidades

### Compartilhamento de Posts
- Botões de compartilhamento para redes sociais (Facebook, Twitter, LinkedIn, WhatsApp, Telegram)
- Funcionalidade de copiar link
- Integrado nas páginas individuais de posts

### Posts Relacionados
- Exibição automática de posts relacionados baseados em categorias
- Grade com 3 posts em layout responsivo (padrão: 3)
- Design idêntico ao layout da home para consistência visual

### Contador de Estatísticas (Backend)
- Contador automático de visualizações para cada post
- Prevenção de contagem duplicada por sessão
- Rastreamento invisível no frontend
- API dedicada para incrementar visualizações
- Dados disponíveis no Sanity CMS para análise

## Configuração

Para as funcionalidades de compartilhamento funcionarem corretamente, adicione a seguinte variável de ambiente:

```env
NEXT_PUBLIC_BASE_URL=https://grupoazimute.com.br
```

## Componentes Adicionados

- `components/share-buttons.tsx` - Componente de botões de compartilhamento
- `components/related-posts.tsx` - Componente de posts relacionados
- `components/view-tracker.tsx` - Rastreador invisível de visualizações
- `hooks/useViewCount.ts` - Hook para gerenciar contador de visualizações
- `app/api/increment-view/route.ts` - API para incrementar visualizações

## Melhorias de UX

### Tipografia Otimizada
- Ajustado tamanho da fonte das listas (ul/ol) nos posts do blog
- Parágrafos e blockquotes com tamanho mais adequado
- Design responsivo mantido para mobile e desktop

### Schema de Categorias Atualizado
- Campo `slug` adicionado ao schema de categorias no Sanity
- Geração automática de slug baseado no título
- Queries atualizadas para incluir slug das categorias
- Tipos TypeScript atualizados
