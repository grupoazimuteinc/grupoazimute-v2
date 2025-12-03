# 🎄 Componente de Aviso de Recesso

Componente reutilizável para exibir avisos de recesso/feriados com botões de contato (WhatsApp e E-mail). Desenvolvido para **não ser bloqueado por ad blockers**.

## ✨ Características

- ✅ **Anti Ad Blocker**: Usa nomenclaturas genéricas para evitar bloqueios
- ✅ **Configurável**: Fácil personalização via arquivo de configuração
- ✅ **Responsivo**: Funciona perfeitamente em mobile e desktop
- ✅ **Persistente**: Usa localStorage para lembrar quando foi fechado
- ✅ **Inteligente**: Mostra automaticamente no período configurado
- ✅ **Reutilizável**: Fácil de duplicar em outros projetos

## 🚀 Como Usar

### 1. Instalação Básica

O componente já está configurado no projeto. Para ativá-lo, basta ajustar as datas no arquivo de configuração:

```typescript
// config/holiday-notice.config.ts
export const holidayNoticeConfig: HolidayNoticeConfig = {
  startDate: '2024-12-20', // Data de início do recesso
  endDate: '2025-01-05',   // Data de fim do recesso
  // ... outras configurações
}
```

### 2. Personalização

Edite o arquivo `config/holiday-notice.config.ts` para personalizar:

```typescript
export const holidayNoticeConfig: HolidayNoticeConfig = {
  // Mensagem
  title: 'Recesso de Fim de Ano',
  message: 'Sua mensagem personalizada aqui...',
  
  // Datas
  startDate: '2024-12-20',
  endDate: '2025-01-05',
  
  // WhatsApp
  whatsappNumber: '5547999110824', // Formato: código país + DDD + número
  whatsappMessage: 'Mensagem pré-formatada para WhatsApp',
  
  // E-mail
  email: 'comercial@grupoazimute.com.br',
  emailSubject: 'Assunto do e-mail',
  
  // Cores (opcional)
  backgroundColor: '#1f2937',
  textColor: '#ffffff',
  accentColor: '#3b82f6',
}
```

### 3. Desativar Temporariamente

Para desativar sem remover o código:

```typescript
// No layout.tsx ou config
<HolidayNotice config={{ ...holidayNoticeConfig, autoShow: false }} />
```

Ou simplesmente comente a linha no layout:

```tsx
{/* <HolidayNotice config={holidayNoticeConfig} /> */}
```

## 📋 Duplicação em Outros Projetos

### Passo 1: Copiar Arquivos

Copie estes arquivos para o novo projeto:

```
components/holiday-notice.tsx
config/holiday-notice.config.ts
```

### Passo 2: Ajustar Configuração

Edite `config/holiday-notice.config.ts` com os dados do novo projeto:

```typescript
export const holidayNoticeConfig: HolidayNoticeConfig = {
  // IMPORTANTE: Mude a storageKey para cada site
  storageKey: 'nome-do-site-holiday-notice', // Único por site
  
  whatsappNumber: '5511999999999', // Novo número
  email: 'contato@novosite.com.br', // Novo e-mail
  // ... ajuste outras configurações
}
```

### Passo 3: Adicionar no Layout

No layout principal do projeto:

```tsx
import { HolidayNotice } from '@/components/holiday-notice'
import { holidayNoticeConfig } from '@/config/holiday-notice.config'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <HolidayNotice config={holidayNoticeConfig} />
        {children}
      </body>
    </html>
  )
}
```

### Passo 4: Verificar Dependências

O componente usa apenas:
- React (useState, useEffect)
- Next.js (para Image, se necessário)
- Tailwind CSS (classes utilitárias)

Se o projeto não usar Tailwind, você pode:
1. Adicionar Tailwind CSS, ou
2. Converter as classes para CSS inline (já está parcialmente implementado)

## 🎨 Personalização Avançada

### Cores Personalizadas

```typescript
const customConfig = {
  ...holidayNoticeConfig,
  backgroundColor: '#0f172a', // Fundo escuro
  textColor: '#f1f5f9',        // Texto claro
  accentColor: '#10b981',      // Verde para destaque
}
```

### Sem Botão de Fechar

```typescript
const config = {
  ...holidayNoticeConfig,
  showCloseButton: false, // Usuário não pode fechar
}
```

### Mostrar Manualmente

```typescript
// No componente, você pode controlar manualmente:
const [showNotice, setShowNotice] = useState(false)

// E usar:
{showNotice && <HolidayNotice config={holidayNoticeConfig} />}
```

## 🔧 Funcionalidades

### Exibição Automática

O componente mostra automaticamente:
- **7 dias antes** da data de início do recesso
- **Durante todo o período** de recesso
- **Até a data de fim** configurada

### Persistência

- Usa `localStorage` para lembrar se foi fechado
- Chave única por site (configurável via `storageKey`)
- Não mostra novamente se já foi fechado

### Responsividade

- Layout adaptativo para mobile e desktop
- Botões empilhados em telas pequenas
- Overlay com blur para melhor visibilidade

## 🛡️ Anti Ad Blocker

O componente foi desenvolvido para evitar bloqueios:

- ✅ Não usa palavras como "popup", "modal", "ad", "banner"
- ✅ Usa nomenclaturas genéricas: "holiday-notice", "notification"
- ✅ Estrutura simples e direta
- ✅ Sem scripts externos suspeitos
- ✅ Código limpo e legítimo

## 📱 Exemplo de Uso

```tsx
// Exemplo básico
<HolidayNotice config={holidayNoticeConfig} />

// Exemplo com configuração inline
<HolidayNotice 
  config={{
    title: 'Férias Coletivas',
    message: 'Estaremos de férias...',
    whatsappNumber: '5511999999999',
    email: 'contato@empresa.com.br',
  }}
/>

// Exemplo sem datas (sempre visível até fechar)
<HolidayNotice 
  config={{
    ...holidayNoticeConfig,
    startDate: undefined,
    endDate: undefined,
  }}
/>
```

## 🐛 Troubleshooting

### Componente não aparece

1. Verifique se `autoShow: true` na configuração
2. Verifique se as datas estão corretas
3. Limpe o localStorage: `localStorage.removeItem('holiday-notice-dismissed')`
4. Verifique se não foi fechado anteriormente

### Botões não funcionam

1. Verifique se os números/e-mails estão corretos
2. WhatsApp: formato deve ser `código país + DDD + número` (sem caracteres especiais)
3. E-mail: deve ser um endereço válido

### Estilos quebrados

1. Verifique se Tailwind CSS está configurado
2. Ou converta classes para CSS inline (já parcialmente implementado)

## 📝 Notas

- O componente é **client-side only** (usa 'use client')
- Requer JavaScript habilitado
- Compatível com Next.js 13+ (App Router)
- Funciona com React 18+

## 🔄 Atualizações Futuras

Possíveis melhorias:
- [ ] Suporte a múltiplos idiomas
- [ ] Animações de entrada/saída
- [ ] Suporte a imagens personalizadas
- [ ] Integração com calendário
- [ ] Modo escuro/claro automático

---

**Desenvolvido para Grupo Azimute** 🏢





