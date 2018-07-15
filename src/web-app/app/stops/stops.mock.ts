import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Stop } from './stop';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const stops = [
      {
        id:'187',
        name: 'Black Panther',
        lines: [
          {
          number: 24,
          color: 'blue',
          },
          {
          number: 14,
          color: 'pink',
          },
          {
          number: 7,
          color: 'orange',
          },
          {
          number: 90,
          color: 'yellow',
          },
        ],
        direction: 'Paris',
        type: 'M'
      },
      {
        id:'220',
        name: 'Captain America',
        lines: [
          {
          number: 14,
          color: 'blue',
          },
          {
          number: 19,
          color: 'pink',
          },
          {
          number: 1,
          color: 'orange',
          },
          {
          number: 90,
          color: 'yellow',
          },
        ],
        direction: 'Barcelona',
        type: 'M'
      },
      {
        id:'351',
        name: 'HULK',
        lines: [
          {
          number: 24,
          color: 'blue',
          },
          {
          number: 14,
          color: 'pink',
          },
          {
          number: 7,
          color: 'orange',
          },
          {
          number: 90,
          color: 'yellow',
          },
        ],
        direction: 'Lyon',
        type: 'M'
      },
      {
        id:'664',
        name: 'Thor',
        lines: [
          {
          number: 24,
          color: 'blue',
          },
          {
          number: 14,
          color: 'pink',
          },
          {
          number: 7,
          color: 'orange',
          },
          {
          number: 90,
          color: 'yellow',
          },
        ],
        direction: 'Pauline',
        type: 'M'
      },
      {
        id:'740',
        name: 'Silver Surfer',
        lines: [
          {
          number: 24,
          color: 'blue',
          },
          {
          number: 14,
          color: 'pink',
          },
          {
          number: 7,
          color: 'orange',
          },
          {
          number: 90,
          color: 'yellow',
          },
        ],
        direction: 'Pauline',
        type: 'M'
      },
      {
        id:'718',
        name: 'Wolverine',
        lines: [
          {
          number: 24,
          color: 'blue',
          },
          {
          number: 14,
          color: 'pink',
          },
          {
          number: 7,
          color: 'orange',
          },
          {
          number: 90,
          color: 'yellow',
          },
        ],
        direction: 'Pauline',
        type: 'M'
      },
      {
        id:'262',
        name: 'Daredevil',
        lines: [
          {
          number: 24,
          color: 'blue',
          },
          {
          number: 14,
          color: 'pink',
          },
          {
          number: 7,
          color: 'orange',
          },
          {
          number: 90,
          color: 'yellow',
          },
        ],
        direction: 'Pauline',
        type: 'M'
      },
      {
        id:'282',
        name: 'Doctor Strange',
        lines: [
          {
          number: 24,
          color: 'blue',
          },
          {
          number: 14,
          color: 'pink',
          },
          {
          number: 7,
          color: 'orange',
          },
          {
          number: 90,
          color: 'yellow',
          },
        ],
        direction: 'Pauline',
        type: 'M'
      }
    ];
    return { stops };
  }
}
