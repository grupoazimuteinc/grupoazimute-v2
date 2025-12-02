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
  message: 'Estaremos em férias coletivas a partir do dia 22/12/2025, com retorno às atividades no dia 12/01/2026. Entre em contato conosco para mais informações através dos canais abaixo.',

  // WhatsApp
  whatsappNumber: '5547999110824', // Número com código do país (55 = Brasil) e DDD, sem caracteres especiais
  whatsappMessage: 'Olá! Gostaria de mais informações sobre o recesso de fim de ano do Grupo Azimute.',

  // E-mail
  email: 'comercial@grupoazimute.com.br',
  emailSubject: 'Dúvida sobre recesso de fim de ano do Grupo Azimute',

  // Configurações de exibição
  storageKey: 'grupo-azimute-holiday-notice', // Chave única para localStorage (mude para cada site)
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

