export const LOCATION_NOT_DEFINED: string = '500 Not defined';

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
        startTime: '18:00h',
        description: 'sessão de abertura',
        location: 'B107'
      },
      {
        startTime: '18:30h',
        description: 'revelação do tema',
        location: 'B107'
      },
      {
        startTime: '19:00h',
        description: 'jantar convívio',
        location: 'Cantinha do ISEP'
      },
      {
        startTime: '20:00h',
        description: 'início desenvolvimento',
        location: 'B107-B109'      
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
        description: 'almoço',
        location: 'B103'
      },
      {
        startTime: '20:00h',
        description: 'jantar',
        location: 'B103'
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
        description: 'almoço',
        location: 'B103'
      },
      {
        startTime: '16:00h',
        description: 'submissão dos projetos',
        location: 'B107'
      },
      {
        startTime: '16:30h',
        description: 'pitch aos juris',
        location: 'B103'
      },
      {
        startTime: '18:30h',
        description: 'entrega dos prémios',
        location: 'B103'
      }
    ]
  }
];
