export const LOCATION_NOT_DEFINED: string = 'undefined';

type GamejamEvent = {
  startTime: string;
  description: string;
  location?: string;
};

type Day = {
  id: number;
  date: string;
  name: string;
  events: GamejamEvent[];
};

export const schedule: Day[] = [
  {
    id: 1,
    name: 'Sexta-Feira',
    date: '24 maio',
    events: [
      {
        startTime: '17:00h',
        description: 'sessão de abertura'
      },
      {
        startTime: '18:00h',
        description: 'revelação do tema'
      },
      {
        startTime: '19:00h',
        description: 'jantar convívio'
      },
      {
        startTime: '20:00h',
        description: 'início desenvolvimento'
      }
    ]
  },
  {
    id: 2,
    name: 'Sábado',
    date: '25 maio',
    events: [
      {
        startTime: '13:00h',
        description: 'almoço'
      },
      {
        startTime: '20:00h',
        description: 'jantar'
      }
    ]
  },
  {
    id: 3,
    name: 'Domingo',
    date: '26 maio',
    events: [
      {
        startTime: '13:00h',
        description: 'almoço'
      },
      {
        startTime: '16:00h',
        description: 'submissão dos projetos'
      },
      {
        startTime: '16:30h',
        description: 'pitch aos juris'
      },
      {
        startTime: '18:30h',
        description: 'entrega dos prémios'
      }
    ]
  }
];
