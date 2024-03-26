'use client'

import { experimental_useFormStatus } from 'react-dom'

export function FormButton() {
    const { pending } = experimental_useFormStatus()

    return(
        <>
            <button type="submit" disabled={ pending } className="bg-black text-white flex items-center font-semibold h-[50px] xl:h-[60px] rounded-full px-10 hover:opacity-80 transition-opacity">
                { pending ? (
                    <>
                        <svg 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="animate-spin lucide lucide-loader-circle mr-1"
                        >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg> Carregando...
                    </>
                ) : 'Finalizar cadastro' }
            </button>
        </>
    )
}