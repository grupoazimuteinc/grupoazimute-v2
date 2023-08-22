import * as React from 'react'

interface EmailTemplateProps {
    name: string;
    email: string;
    cargo: string;
    message: string;
}

export const ContactTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, email, cargo, message }) => (
    <div>
        <h1 style={{color: '#000', fontFamily: 'Roboto, sans-serif'}}>Welcome!!!</h1>

        <p style={{color: '#000', fontFamily: 'Roboto, sans-serif'}}>
            { name } <br />
            { email } <br />
            { cargo } <br />
            { message }
        </p>
    </div>
)