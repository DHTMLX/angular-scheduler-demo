import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Scheduler, SchedulerStatic } from "@dhx/trial-scheduler";
import { EventService } from "../services/event.service";


@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "scheduler",
    providers: [EventService],
    styleUrls: ['scheduler.component.css'],
    templateUrl: 'scheduler.component.html'
})


export class SchedulerComponent implements OnInit {
    @ViewChild("scheduler_here", { static: true }) schedulerContainer: ElementRef;
    private _scheduler?: SchedulerStatic;
    constructor(private eventService: EventService) { }

    ngOnInit() {
        let scheduler = Scheduler.getSchedulerInstance();
        scheduler.config.date_format = '%Y-%m-%d %H:%i';

        scheduler.init(this.schedulerContainer.nativeElement, new Date(2024, 9, 1));
        const dp = scheduler.createDataProcessor({
            event: {
                create: (data: any) => this.eventService.insert(data),
                update: (data: any) => this.eventService.update(data),
                delete: (id: number) => this.eventService.remove(id),
            }
        });

        this.eventService.get()
            .then((data) => {
                scheduler.parse(data);
            });
        this._scheduler = scheduler;
    }
    
    ngOnDestroy() {
        if (this._scheduler) this._scheduler.destructor();
    }
}