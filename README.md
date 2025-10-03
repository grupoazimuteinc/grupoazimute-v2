# Grupo Azimute v3.0.7

## Novas Funcionalidades

### Compartilhamento de Posts
- Botões de compartilhamento para redes sociais (Facebook, Twitter, LinkedIn, WhatsApp, Telegram)
- Funcionalidade de copiar link
- Integrado nas páginas individuais de posts

### Posts Relacionados
- Exibição automática de posts relacionados baseados em categorias
- Grade com 3 posts em layout responsivo (padrão: 3)
- Design idêntico ao layout da home para consistência visual

## Configuração

Para as funcionalidades de compartilhamento funcionarem corretamente, adicione a seguinte variável de ambiente:

```env
NEXT_PUBLIC_BASE_URL=https://grupoazimute.com.br
```

## Componentes Adicionados

- `components/share-buttons.tsx` - Componente de botões de compartilhamento
- `components/related-posts.tsx` - Componente de posts relacionados

## Melhorias de UX

### Tipografia Otimizada
- Ajustado tamanho da fonte das listas (ul/ol) nos posts do blog
- Parágrafos e blockquotes com tamanho mais adequado
- Design responsivo mantido para mobile e desktop