import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { scheduler } from "dhtmlx-scheduler";
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

    constructor(private eventService: EventService) { }

    ngOnInit() {

        scheduler.config.date_format = '%Y-%m-%d %H:%i';

        scheduler.init(this.schedulerContainer.nativeElement, new Date(2022, 8, 1));
        scheduler.createDataProcessor((entity: any, action: any, data: any, id: string | number) => {
            switch (action) {
                case "create":
                    return this.eventService.insert(data);
                    break;
                case "update":
                    return this.eventService.update(data);
                    break;
                case "delete":
                    return this.eventService.remove(data);
                    break;
            }
            throw new Error(`Action [${action}] is not implemented`);
        });

        this.eventService.get()
            .then((data) => {
                scheduler.parse(data);
            });

    }
}