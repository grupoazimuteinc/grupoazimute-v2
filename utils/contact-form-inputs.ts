export const contactFomInputs = [
    {
        name: 'name',
        label: 'Nome *',
        type: 'text',
        required: true
    },
    {
        name: 'email',
        label: 'E-mail *',
        type: 'email',
        required: true
    },
    {
        name: 'company',
        label: 'Empresa',
        type: 'text',
        required: false
    },
    {
        name: 'phone',
        label: 'Telefone',
        type: 'text',
        mask: '(99) 99999-9999',
        required: false
    },
    {
        name: 'message',
        label: 'Observação',
        type: 'textarea',
        required: false
    }
]