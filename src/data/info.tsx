
type Info = {
    title: string;
    items: (string | JSX.Element)[];
};

export const info: Info[] = [
    {
        title: 'Are you ready?',
        items: [
            <>
                A terceira edição da LEVEL-UP GAMEJAM <br /> criada pelo NEI regressa. Maior e melhor.
            </>
        ]
    },
    {
        title: 'Data',
        items: [
            '3 junho (18h) - 5 junho (18h)',
        ]
    },
    {
        title: 'Local',
        items: [
            'Instituto Superior de Engenharia do Porto',
        ]
    },
    {
        title: 'Regras',
        items: [
            'Grupos de 1-5 pessoas',
            '46 horas para desenvolvimento',
            <>Cada equipa terá 5 minutos para fazer um Pitch<br /> seguida de perguntas do júri.</>,
        ]
    },
    {
        title: 'Outras Informações',
        items: [
            'Coffee breaks e refeições incluídas',
            'Staff disponível a qualquer momento',
            'Inscrição obrigatória!',
        ]
    },
];
