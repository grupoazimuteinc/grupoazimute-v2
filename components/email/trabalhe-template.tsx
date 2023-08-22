import * as React from 'react'

interface EmailTemplateProps {
    name: string;
    email: string;
    linkedin: string;
    arquivo: string;
    message: string;
}

export const ContactTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, email, linkedin, arquivo, message }) => (
    <div>
        <h1 style={{color: '#000', fontFamily: 'Roboto, sans-serif'}}>Welcome!!!</h1>

        <p style={{color: '#000', fontFamily: 'Roboto, sans-serif'}}>
            { name } <br />
            { email } <br />
            { linkedin } <br />
            { arquivo } <br />
            { message }
        </p>
    </div>
)