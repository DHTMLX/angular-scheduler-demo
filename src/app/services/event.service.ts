import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { SchedulerEvent } from '../models/scheduler-event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly eventUrl = 'api/events';

  constructor(private readonly http: HttpClient) {}

  get(): Promise<SchedulerEvent[]> {
    return firstValueFrom(this.http.get<SchedulerEvent[]>(this.eventUrl))
      .catch(this.handleError);
  }

  insert(event: SchedulerEvent): Promise<SchedulerEvent> {
    return firstValueFrom(this.http.post<SchedulerEvent>(this.eventUrl, event))
      .catch(this.handleError);
  }

  update(event: SchedulerEvent): Promise<void> {
    return firstValueFrom(this.http.put<void>(`${this.eventUrl}/${event.id}`, event))
      .catch(this.handleError);
  }

  remove(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.eventUrl}/${id}`))
      .catch(this.handleError);
  }

  private handleError(error: unknown): Promise<never> {
    console.error(error);
    return Promise.reject(error);
  }
}