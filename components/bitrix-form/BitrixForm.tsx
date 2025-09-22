'use client';
import { useEffect, useRef } from 'react';

export default function BitrixForm() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Evita duplicar no StrictMode
    if (containerRef.current.dataset.bxMounted === 'true') return;
    containerRef.current.dataset.bxMounted = 'true';

    // cria <script data-b24-form="..."> exatamente como o Bitrix espera
    const script = document.createElement('script');
    script.setAttribute('data-b24-form', 'inline/21/0r0yzj');
    script.setAttribute('data-skip-moving', 'true');
    script.src = 'https://cdn.bitrix24.com.br/b12867499/crm/form/loader_21.js?' + ((Date.now()/180000)|0);

    containerRef.current.appendChild(script);

    return () => {
      containerRef.current && (containerRef.current.innerHTML = '');
      if (containerRef.current) delete containerRef.current.dataset.bxMounted;
    };
  }, []);

  return <div ref={containerRef} style={{ minHeight: 60 }} />;
}
