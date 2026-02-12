/**
 * Configuração do componente de aviso de recesso
 * 
 * Este arquivo pode ser facilmente copiado e adaptado para outros projetos.
 * Basta ajustar os valores abaixo conforme necessário.
 */

import { HolidayNoticeConfig } from '@/components/holiday-notice'

export const holidayNoticeConfig: HolidayNoticeConfig = {
  // Mensagem principal
  title: 'Grupo Azimute informa:',
  message: 'Em função do recesso de carnaval, não teremos expediente nos dias 16 e 17 de fevereiro. Retornaremos às atividades normalmente no dia 18.',

  // WhatsApp
  whatsappNumber: '5547999110824', // Número com código do país (55 = Brasil) e DDD, sem caracteres especiais
  whatsappMessage: 'Olá! Entrando em contato durante o recesso de carnaval do Grupo Azimute.',

  // E-mail
  email: 'comercial@grupoazimute.com.br',
  emailSubject: 'Contato durante o recesso de carnaval do Grupo Azimute.',

  // Configurações de exibição
  storageKey: 'grupo-azimute-carnival-notice', // Chave única para localStorage (mude para cada site)
  showCloseButton: true, // Permitir fechar o aviso
  autoShow: true, // Mostrar automaticamente ao carregar a página

  // Cores personalizadas (opcional)
  backgroundColor: '#1f2937', // Cor de fundo do card
  textColor: '#ffffff', // Cor do texto
  accentColor: '#3b82f6', // Cor de destaque (botão e-mail, ícone)
}

/**
 * Exemplo de uso no layout:
 * 
 * import { HolidayNotice } from '@/components/holiday-notice'
 * import { holidayNoticeConfig } from '@/config/holiday-notice.config'
 * 
 * export default function Layout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <HolidayNotice config={holidayNoticeConfig} />
 *         {children}
 *       </body>
 *     </html>
 *   )
 * }
 */

