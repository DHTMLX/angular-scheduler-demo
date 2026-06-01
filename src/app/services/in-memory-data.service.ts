import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SchedulerEvent } from '../models/scheduler-event';

export class InMemoryDataService implements InMemoryDbService {
  createDb(): { events: SchedulerEvent[] } {
    const events: SchedulerEvent[] = [
      { id: 1, start_date: '2027-10-06 06:00', end_date: '2027-10-06 13:00', text: 'Event 1' },
      { id: 2, start_date: '2027-10-08 07:00', end_date: '2027-10-08 12:00', text: 'Event 2' },
    ];

    return { events };
  }
}