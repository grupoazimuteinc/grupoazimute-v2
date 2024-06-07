export const trabalheConoscoFormInputs = [
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
        name: 'phone',
        label: 'Telefone *',
        type: 'text',
        mask: '(99) 99999-9999',
        required: false
    },
    {
        name: 'linkedin',
        label: 'Linkedin *',
        type: 'text',
        required: true
    },
    // {
    //     name: 'grupo',
    //     label: 'Empresa do Grupo',
    //     type: 'select',
    //     options: [
    //         {
    //             value: '',
    //             label: 'Selecione'
    //         },
    //         {
    //             value: 'Azimute Engenharia',
    //             label: 'Azimute Engenharia'
    //         },
    //         {
    //             value: 'Azimute Imóveis',
    //             label: 'Azimute Imóveis'
    //         },
    //         {
    //             value: 'Azimute Tech',
    //             label: 'Azimute Tech'
    //         },
    //         {
    //             value: 'Azimute San',
    //             label: 'Azimute San'
    //         },
    //         {
    //             value: 'Aria Imagem e Tecnologia',
    //             label: 'Aria Imagem e Tecnologia'
    //         }
    //     ],
    //     required: true
    // },
    {
        name: 'arquivo',
        label: 'Link para o arquivo *',
        type: 'text',
        required: true
    },
    {
        name: 'message',
        label: 'Mensagem adicional',
        type: 'textarea',
        required: false
    },
    {
        name: 'button',
        label: 'Enviar informações',
        type: 'button'
    }
]