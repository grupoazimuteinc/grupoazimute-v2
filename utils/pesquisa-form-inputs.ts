export const pesquisaFormInputs = [
    {
        name: 'name',
        label: 'Nome da sua empresa *',
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
        name: 'cargo',
        label: 'Cargo *',
        type: 'text',
        required: true
    },
    {
        name: 'comoChegou',
        label: 'Como você chegou até nós? *',
        type: 'select',
        options: [
            {
                value: '',
                label: 'Selecione'
            },
            {
                value: 'Já sou cliente',
                label: 'Já sou cliente'
            },
            {
                value: 'Indicação',
                label: 'Indicação'
            },
            {
                value: 'Google',
                label: 'Google'
            },
            {
                value: 'Redes Sociais',
                label: 'Redes Sociais'
            },
            {
                value: 'Outros',
                label: 'Outros'
            }
        ],
        required: true
    },
    {
        name: 'empresaAzimute',
        label: 'Qual empresa você quer avaliar?*',
        type: 'select',
        options: [
            {
                value: '',
                label: 'Selecione'
            },
            {
                value: 'Azimute Engenharia',
                label: 'Azimute Engenharia'
            },
            {
                value: 'Azimute Imóveis',
                label: 'Azimute Imóveis'
            },
            {
                value: 'Azimute Tech',
                label: 'Azimute Tech'
            },
            {
                value: 'Azimute San',
                label: 'Azimute San'
            },
            {
                value: 'Aria - Imagem e Tecnologia',
                label: 'Aria - Imagem e Tecnologia'
            },
        ],
        required: true
    },
    {
        name: 'atendimento',
        label: 'Como foi nosso atendimento? *',
        type: 'select',
        options: [
            {
                value: '',
                label: 'Selecione'
            },
            {
                value: '1',
                label: '1'
            },
            {
                value: '2',
                label: '2'
            },
            {
                value: '3',
                label: '3'
            },
            {
                value: '4',
                label: '4'
            },
            {
                value: '5',
                label: '5'
            }
        ],
        required: true
    },
    {
        name: 'qualidade',
        label: 'Avalie a qualidade dos serviços entregues *',
        type: 'select',
        options: [
            {
                value: '',
                label: 'Selecione'
            },
            {
                value: '1',
                label: '1'
            },
            {
                value: '2',
                label: '2'
            },
            {
                value: '3',
                label: '3'
            },
            {
                value: '4',
                label: '4'
            },
            {
                value: '5',
                label: '5'
            }
        ],
        required: true
    },
    {
        name: 'expectativa',
        label: 'Atendemos suas expectativas? *',
        type: 'select',
        options: [
            {
                value: '',
                label: 'Selecione'
            },
            {
                value: 'Sim',
                label: 'Sim'
            },
            {
                value: 'Não',
                label: 'Não'
            }
        ],
        required: true
    },
    {
        name: 'indicacao',
        label: 'Você nos indicaria para outra empresa? *',
        type: 'select',
        options: [
            {
                value: '',
                label: 'Selecione'
            },
            {
                value: 'Sim',
                label: 'Sim'
            },
            {
                value: 'Não',
                label: 'Não'
            }
        ],
        required: true
    },
    {
        name: 'message',
        label: 'Deixe aqui seu elogio e/ou crítica.',
        type: 'textarea',
        required: false
    },
    {
        name: 'button',
        label: 'Enviar pesquisa',
        type: 'button'
    }
]