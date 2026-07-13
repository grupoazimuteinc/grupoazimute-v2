'use client'

import { useState } from 'react'

import { copyTextToClipboard } from './copy-to-clipboard'

interface CopyUrlButtonProps {
  url: string
}

export function CopyUrlButton({ url }: CopyUrlButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await copyTextToClipboard(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={{
        padding: '10px 16px',
        borderRadius: 8,
        border: '1px solid #D9D9D9',
        background: copied ? '#E8F5E9' : '#FFFFFF',
        color: '#333333',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      {copied ? 'URL copiada!' : 'Copiar URL'}
    </button>
  )
}
