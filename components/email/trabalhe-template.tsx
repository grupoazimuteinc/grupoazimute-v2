import * as React from 'react'

interface EmailTemplateProps {
    name: string;
    email: string;
    linkedin: string;
    arquivo: string;
    grupo: string;
    message: string;
}

export const ContactTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, email, linkedin, arquivo, message, grupo }) => (
    <div>
        <h1 style={{color: '#000', fontFamily: 'Roboto, sans-serif'}}>Trabalhe Conosco</h1>

        <p style={{color: '#000', fontFamily: 'Roboto, sans-serif'}}>
            { name } <br />
            { email } <br />
            { linkedin } <br />
            { grupo } <br />
            { arquivo } <br />
            { message }
        </p>
    </div>
)