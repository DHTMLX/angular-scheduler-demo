import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { Scheduler, SchedulerStatic } from '@dhx/trial-scheduler';

import { SchedulerEvent } from '../../models/scheduler-event';
import { EventService } from '../../services/event.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-scheduler',
  standalone: true,
  styleUrl: './scheduler.component.css',
  templateUrl: './scheduler.component.html',
})
export class SchedulerComponent implements OnInit, OnDestroy {
  @ViewChild('schedulerContainer', { static: true })
  private readonly schedulerContainer!: ElementRef<HTMLElement>;

  private readonly eventService = inject(EventService);
  private scheduler?: SchedulerStatic;

  ngOnInit(): void {
    const scheduler = Scheduler.getSchedulerInstance();
    scheduler.config.date_format = '%Y-%m-%d %H:%i';

    scheduler.init(this.schedulerContainer.nativeElement, new Date(2027, 9, 7));
    scheduler.createDataProcessor({
      event: {
        create: (event: SchedulerEvent) => this.eventService.insert(event),
        update: (event: SchedulerEvent) => this.eventService.update(event),
        delete: (id: number) => this.eventService.remove(id),
      },
    });

    this.eventService.get()
      .then((events) => scheduler.parse(events));

    this.scheduler = scheduler;
  }

  ngOnDestroy(): void {
    this.scheduler?.destructor();
  }
}
