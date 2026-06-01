import { TestBed } from '@angular/core/testing';
import { Scheduler, SchedulerStatic } from '@dhx/trial-scheduler';

import { AppComponent } from './app';
import { SchedulerEvent } from './models/scheduler-event';
import { EventService } from './services/event.service';

describe('AppComponent', () => {
  const events: SchedulerEvent[] = [];
  let scheduler: jasmine.SpyObj<SchedulerStatic>;
  let eventService: jasmine.SpyObj<EventService>;

  beforeEach(async () => {
    scheduler = jasmine.createSpyObj<SchedulerStatic>('scheduler', [
      'init',
      'parse',
      'createDataProcessor',
      'destructor',
    ]);
    scheduler.config = {} as SchedulerStatic['config'];
    scheduler.createDataProcessor.and.returnValue({});

    spyOn(Scheduler, 'getSchedulerInstance').and.returnValue(scheduler);

    eventService = jasmine.createSpyObj<EventService>('EventService', [
      'get',
      'insert',
      'update',
      'remove',
    ]);
    eventService.get.and.resolveTo(events);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: EventService, useValue: eventService }],
    }).compileComponents();
  });

  it('creates the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('renders the scheduler component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-scheduler')).not.toBeNull();
  });
});
