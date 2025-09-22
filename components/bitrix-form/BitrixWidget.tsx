'use client';
import Script from 'next/script';

export default function BitrixWidget() {
        return (
                <Script
                        id="bitrix-widget-script"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                                __html: `(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})(window,document,'https://cdn.bitrix24.com.br/b12867499/crm/form/loader_38.js');`
                        }}
                />
        );
}
