import * as React from 'react'

interface EmailTemplateProps {
    name: string;
    phone: string;
    email: string;
    message: string;
}

export const ContactTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, phone, email, message }) => (
    <div>
        <h1 style={{color: '#000', fontFamily: 'Roboto, sans-serif'}}>Welcome!!!</h1>

        <p style={{color: '#000', fontFamily: 'Roboto, sans-serif'}}>
            { name } <br />
            { phone } <br />
            { email } <br />
            { message }
        </p>
    </div>
)