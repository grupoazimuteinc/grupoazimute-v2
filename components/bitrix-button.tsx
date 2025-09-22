'use client'

import { useEffect } from 'react'

export default function BitrixButton() {
  useEffect(() => {
    // Função para carregar o script do Bitrix24
    const loadBitrix24 = () => {
      // Verifica se já foi carregado
      if (window.BX24) {
        return
      }

      // Cria e executa o script
      const script = document.createElement('script')
      script.innerHTML = `
        (function(w,d,u){
          var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);
          var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
        })(window,document,'https://cdn.bitrix24.com.br/b12867499/crm/form/loader_38.js');
      `
      script.setAttribute('data-b24-form', 'inline/38/k7tcqn')
      script.setAttribute('data-skip-moving', 'true')
      
      document.head.appendChild(script)
    }

    // Aguarda um pouco antes de carregar
    const timer = setTimeout(loadBitrix24, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {/* Script inline do Bitrix24 */}
      <script
        data-b24-form="inline/38/k7tcqn"
        data-skip-moving="true"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,u){
              var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);
              var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
            })(window,document,'https://cdn.bitrix24.com.br/b12867499/crm/form/loader_38.js');
          `,
        }}
      />
    </>
  )
}
