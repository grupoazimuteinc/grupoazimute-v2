'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import avatarAlt02 from '@/src/images/avatar_alt_01.png'

export interface HolidayNoticeConfig {
  // Mensagem principal
  title?: string
  message?: string
  
  // Contatos
  whatsappNumber?: string
  whatsappMessage?: string
  email?: string
  emailSubject?: string
  
  // Configurações de exibição
  storageKey?: string // chave para localStorage
  showCloseButton?: boolean
  autoShow?: boolean // mostrar automaticamente ao carregar
  
  // Estilo customizável
  backgroundColor?: string
  textColor?: string
  accentColor?: string
}

interface HolidayNoticeProps {
  config?: HolidayNoticeConfig
}

const defaultConfig: HolidayNoticeConfig = {
  title: 'Grupo Azimute informa:',
  message: 'Estaremos em férias coletivas a partir do dia 22/12/2025, com retorno às atividades no dia 12/01/2026. Entre em contato para mais informações através dos canais abaixo.',
  whatsappNumber: '5547999110824',
  whatsappMessage: 'Olá! Gostaria de mais informações sobre o recesso de fim de ano do Grupo Azimute.',
  email: 'comercial@grupoazimute.com.br',
  emailSubject: 'Dúvida sobre recesso de fim de ano do Grupo Azimute',
  storageKey: 'holiday-notice-dismissed',
  showCloseButton: true,
  autoShow: true,
  backgroundColor: '#1f2937',
  textColor: '#ffffff',
  accentColor: '#3b82f6'
}

export function HolidayNotice({ config = {} }: HolidayNoticeProps) {
  const finalConfig = { ...defaultConfig, ...config }
  const {
    title,
    message,
    whatsappNumber,
    whatsappMessage,
    email,
    emailSubject,
    showCloseButton,
    autoShow,
    backgroundColor,
    textColor,
    accentColor
  } = finalConfig

  // Sempre mostrar se autoShow estiver ativo
  const [isVisible, setIsVisible] = useState(autoShow !== false)

  useEffect(() => {
    // Garantir que apareça após renderização completa
    if (autoShow !== false) {
      setIsVisible(true)
    }
  }, [autoShow])

  const handleClose = () => {
    setIsVisible(false)
    // Não salvar no localStorage - sempre mostrar novamente após refresh
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(whatsappMessage || 'Olá! Gostaria de mais informações.')
    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`, '_blank')
  }

  const handleEmail = () => {
    const subject = encodeURIComponent(emailSubject || 'Dúvida')
    window.location.href = `mailto:${email}?subject=${subject}`
  }

  if (!isVisible) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)'
      }}
      onClick={showCloseButton ? handleClose : undefined}
    >
      <div
        className="relative w-full max-w-md rounded-lg shadow-2xl"
        style={{
          backgroundColor: backgroundColor || '#1f2937',
          color: textColor || '#ffffff'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
            aria-label="Fechar"
            style={{ color: textColor || '#ffffff', opacity: 0.7 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Conteúdo */}
        <div className="p-6">
          {/* Ícone/Título */}
          <div className="text-center mb-4">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 overflow-hidden"
              style={{ backgroundColor: accentColor || '#3b82f6' }}
            >
              <Image
                src={avatarAlt02}
                alt="Avatar"
                width={64}
                height={64}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: textColor || '#ffffff' }}
            >
              {title || 'Recesso de Fim de Ano'}
            </h2>
          </div>

          {/* Mensagem */}
          <p
            className="text-center mb-6 leading-relaxed"
            style={{ color: textColor || '#ffffff', opacity: 0.9 }}
          >
            {message || 'Informamos que estaremos em recesso durante o período de fim de ano.'}
          </p>

          {/* Botões de ação */}
          <div className="flex flex-col gap-3">
            {/* WhatsApp */}
            {whatsappNumber && (
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#25D366',
                  color: '#ffffff'
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.375a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Falar no WhatsApp
              </button>
            )}

            {/* E-mail */}
            {email && (
              <button
                onClick={handleEmail}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all border-2 hover:opacity-90"
                style={{
                  borderColor: accentColor || '#3b82f6',
                  color: accentColor || '#3b82f6',
                  backgroundColor: 'transparent'
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Enviar E-mail
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

