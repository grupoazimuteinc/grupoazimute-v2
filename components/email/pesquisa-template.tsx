import * as React from 'react'

interface EmailTemplateProps {
    name: string;
    email: string;
    cargo: string;
    grupo: string;
    comoChegou: string;
    atendimento: string;
    qualidade: string;
    expectativa: string;
    indicacao: string;
    message: string;
}

export const ContactTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, email, cargo, grupo, comoChegou, atendimento, qualidade, expectativa, indicacao, message }) => (
    <div>
        <h1 style={{color: '#000', fontFamily: 'Roboto, sans-serif'}}>Pesquisa de Satisfação</h1>

        <p style={{color: '#000', fontFamily: 'Roboto, sans-serif'}}>
            Nome: { name } <br />
            Email: { email } <br />
            Cargo: { cargo } <br />
            Empresa: { grupo } <br />
            Como chegou até nós? { comoChegou } <br />
            Nota de atendimento: { atendimento } <br />
            Nota de qualidade: { qualidade } <br />
            Nota de expectativa: { expectativa } <br />
            Nota de indicação: { indicacao } <br /><br />
            
            Comentário: { message }
        </p>
    </div>
)