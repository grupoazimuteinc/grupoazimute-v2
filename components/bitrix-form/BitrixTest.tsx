'use client';
import { useEffect, useState } from 'react';

export default function BitrixTest() {
        const [status, setStatus] = useState('Carregando...');
        const [widgetFound, setWidgetFound] = useState(false);

        useEffect(() => {
                const checkBitrixStatus = () => {
                        // Verifica se o script foi carregado
                        const script = document.querySelector('script[src*="bitrix24.com.br"]');
                        if (script) {
                                setStatus('Script carregado');
                        } else {
                                setStatus('Script não encontrado');
                        }

                        // Verifica se o widget apareceu
                        const bitrixWidget = document.querySelector('[data-b24-form]') || 
                                           document.querySelector('.b24-form') || 
                                           document.querySelector('.b24-widget') ||
                                           document.querySelector('.b24-form-btn');
                        
                        if (bitrixWidget) {
                                setWidgetFound(true);
                                setStatus('Widget encontrado!');
                        } else {
                                setWidgetFound(false);
                                setStatus('Widget não encontrado');
                        }
                };

                // Verifica imediatamente
                checkBitrixStatus();

                // Verifica novamente após 3 segundos
                const timer = setTimeout(checkBitrixStatus, 3000);

                return () => clearTimeout(timer);
        }, []);

        return (
                <div style={{
                        position: 'fixed',
                        top: '10px',
                        right: '10px',
                        background: widgetFound ? '#4CAF50' : '#f44336',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        zIndex: 9999,
                        fontSize: '12px',
                        maxWidth: '200px'
                }}>
                        <div>Status: {status}</div>
                        <div>Widget: {widgetFound ? 'Encontrado' : 'Não encontrado'}</div>
                </div>
        );
}
