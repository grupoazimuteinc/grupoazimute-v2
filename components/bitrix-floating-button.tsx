'use client'

import { useState } from 'react'

export default function BitrixFloatingButton() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const openBitrixForm = () => {
    // Carrega o script correto do Bitrix24
    const script = document.createElement('script')
    script.innerHTML = `
      (function(w,d,u){
        var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
        var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
      })(window,document,'https://cdn.bitrix24.com.br/b12867499/crm/form/loader_38.js');
    `
    document.body.appendChild(script)
  }

  return (
    <>
      {/* Botão flutuante personalizado */}
      <button
        onClick={openBitrixForm}
        className="fixed bottom-[35px] right-[35px] h-[80px] w-[80px] bg-blue-600 hover:bg-blue-700 flex justify-center items-center transition-all rounded-full hover:opacity-80 z-50 shadow-lg"
        title="Entre em contato"
      >
        <svg 
          className="w-8 h-8 text-white" 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 28"
        >
          <path 
            fill="#FFFFFF" 
            fillRule="evenodd" 
            d="M815.406703,961 L794.305503,961 C793.586144,961 793,961.586144 793,962.305503 L793,983.406703 C793,984.126062 793.586144,984.712206 794.305503,984.712206 L815.406703,984.712206 C816.126062,984.712206 816.712206,984.126062 816.712206,983.406703 L816.712206,962.296623 C816.703325,961.586144 816.117181,961 815.406703,961 L815.406703,961 Z M806.312583,979.046143 C806.312583,979.454668 805.975106,979.783264 805.575462,979.783264 L796.898748,979.783264 C796.490224,979.783264 796.161627,979.445787 796.161627,979.046143 L796.161627,977.412044 C796.161627,977.003519 796.499105,976.674923 796.898748,976.674923 L805.575462,976.674923 C805.983987,976.674923 806.312583,977.0124 806.312583,977.412044 L806.312583,979.046143 L806.312583,979.046143 Z M813.55946,973.255747 C813.55946,973.664272 813.221982,973.992868 812.822339,973.992868 L796.889868,973.992868 C796.481343,973.992868 796.152746,973.655391 796.152746,973.255747 L796.152746,971.621647 C796.152746,971.213122 796.490224,970.884526 796.889868,970.884526 L812.813458,970.884526 C813.221982,970.884526 813.550579,971.222003 813.550579,971.621647 L813.550579,973.255747 L813.55946,973.255747 Z M813.55946,967.45647 C813.55946,967.864994 813.221982,968.193591 812.822339,968.193591 L796.889868,968.193591 C796.481343,968.193591 796.152746,967.856114 796.152746,967.45647 L796.152746,965.82237 C796.152746,965.413845 796.490224,965.085249 796.889868,965.085249 L812.813458,965.085249 C813.221982,965.085249 813.550579,965.422726 813.550579,965.82237 L813.550579,967.45647 L813.55946,967.45647 Z" 
            transform="translate(-793 -961)"
          />
        </svg>
      </button>

      {/* Script do Bitrix24 carregado automaticamente */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,u){
              var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
              var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
            })(window,document,'https://cdn.bitrix24.com.br/b12867499/crm/form/loader_38.js');
          `,
        }}
      />
    </>
  )
}
