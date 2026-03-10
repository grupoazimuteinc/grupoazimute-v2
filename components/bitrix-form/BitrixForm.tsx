'use client';
import { useEffect, useRef, useState } from 'react';

export default function BitrixForm() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Evita duplicar no StrictMode
    if (containerRef.current.dataset.bxMounted === 'true') return;
    containerRef.current.dataset.bxMounted = 'true';

    // Listener para detectar quando o formulário do Bitrix for enviado com sucesso
    const handleFormSuccess = (event: any) => {
      console.log('Bitrix form submitted successfully', event);
      // Abre o WhatsApp em uma nova aba após o envio do formulário
      setTimeout(() => {
        window.open('https://api.whatsapp.com/send?phone=5547997260011', '_blank');
      }, 1000);
    };

    // Adiciona listeners para eventos do Bitrix
    window.addEventListener('b24:form:submit:success', handleFormSuccess);
    window.addEventListener('onCrmFormSubmit', handleFormSuccess);

    // Cria <script data-b24-form="..."> exatamente como o Bitrix espera
    const script = document.createElement('script');
    script.setAttribute('data-b24-form', 'inline/38/k7tcqn');
    script.setAttribute('data-skip-moving', 'true');
    script.async = true;
    script.src = 'https://cdn.bitrix24.com.br/b12867499/crm/form/loader_38.js?' + ((Date.now() / 180000) | 0);

    script.onload = () => {
      setIsLoading(false);
    };

    script.onerror = () => {
      setHasError(true);
      setIsLoading(false);
    };

    containerRef.current.appendChild(script);

    return () => {
      window.removeEventListener('b24:form:submit:success', handleFormSuccess);
      window.removeEventListener('onCrmFormSubmit', handleFormSuccess);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        delete containerRef.current.dataset.bxMounted;
      }
    };
  }, []);

  if (hasError) {
    return (
      <div style={{ 
        minHeight: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center'
      }}>
        <p style={{ color: '#dc3545', margin: 0 }}>
          Erro ao carregar o formulário. Tente recarregar a página.
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      style={{ 
        minHeight: 400,
        width: '100%',
        position: 'relative'
      }} 
    >
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#666',
          fontSize: '14px'
        }}>
          Carregando formulário...
        </div>
      )}
    </div>
  );
}