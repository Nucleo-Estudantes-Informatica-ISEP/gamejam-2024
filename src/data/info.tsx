type Info = {
  title: string;
  items: (string | JSX.Element)[];
};

export const info: Info[] = [
  {
    title: 'Are you ready?',
    items: [
      <>
        A quinta edição da Gamejam está de volta!<br /> Contamos contigo?
      </>
    ]
  },
  {
    title: 'Data',
    items: ['24 maio (20h) - 26 maio (16h)']
  },
  {
    title: 'Local',
    items: ['Instituto Superior de Engenharia do Porto']
  },
  {
    title: 'Regras',
    items: [
      'Grupos de 1-5 pessoas',
      '46 horas para desenvolvimento',
      <>
        Cada equipa terá 5 minutos para fazer um Pitch
        <br /> seguida de perguntas do júri.
      </>
    ]
  },
  {
    title: 'Outras Informações',
    items: [
      'Coffee breaks e refeições incluídas',
      'Staff disponível a qualquer momento',
      'Inscrição obrigatória!'
    ]
  }
];
