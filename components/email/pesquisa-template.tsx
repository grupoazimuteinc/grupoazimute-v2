import * as React from 'react'

interface EmailTemplateProps {
    name: string;
    email: string;
    cargo: string;
    grupo: string;
    message: string;
}

export const ContactTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, email, cargo, message, grupo }) => (
    <div>
        <h1 style={{color: '#000', fontFamily: 'Roboto, sans-serif'}}>Welcome!!!</h1>

        <p style={{color: '#000', fontFamily: 'Roboto, sans-serif'}}>
            { name } <br />
            { email } <br />
            { cargo } <br />
            { grupo } <br />
            { message }
        </p>
    </div>
)