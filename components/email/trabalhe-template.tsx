import * as React from 'react'

interface EmailTemplateProps {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    arquivo: string;
    grupo: string;
    message: string;
}

export const ContactTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, email, phone, linkedin, arquivo, message, grupo }) => (
    <div>
        <h1 style={{color: '#000', fontFamily: 'Roboto, sans-serif'}}>Trabalhe Conosco</h1>

        <p style={{color: '#000', fontFamily: 'Roboto, sans-serif'}}>
            { name } <br />
            { email } <br />
            { phone } <br />
            { linkedin } <br />
            { grupo } <br />
            { arquivo } <br />
            { message }
        </p>
    </div>
)