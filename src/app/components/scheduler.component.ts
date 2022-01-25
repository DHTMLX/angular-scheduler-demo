import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import "dhtmlx-scheduler";
import {EventService} from "../services/event.service";
import {Event} from "../models/event";
declare let scheduler: any;

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "scheduler",
    providers: [EventService],
    styleUrls: ['scheduler.component.css'],
    templateUrl: 'scheduler.component.html'
})

export class SchedulerComponent implements OnInit {
    @ViewChild("scheduler_here", {static: true}) schedulerContainer: ElementRef;

    constructor(private eventService: EventService){}

    ngOnInit() {
        scheduler.config.xml_date = '%Y-%m-%d %H:%i';


        scheduler.init(this.schedulerContainer.nativeElement, new Date(2017, 8, 1));

        scheduler.attachEvent('onEventAdded', (id: string | number, ev: any) => {
            this.eventService.insert(this.serializeEvent(ev, true))
                .then((response) => {
                    if (response.id !== id) {
                        scheduler.changeEventId(id, response.id);
                    }
                });
        });

        scheduler.attachEvent('onEventChanged', (id: string | number, ev: any) => {
            this.eventService.update(this.serializeEvent(ev));
        });

        scheduler.attachEvent('onEventDeleted', (id: number) => {
            this.eventService.remove(id);
        });

        this.eventService.get()
            .then((data) => {
                scheduler.parse(data, 'json');
            });
    }

    private serializeEvent(data: any, insert: boolean = false): Event {
        const result: any = {};

        for (let i in data) {
            if (i.charAt(0) === '$' || i.charAt(0) === '_') {
                continue;
            }
            if (insert && i === 'id') {
                continue;
            }
            if (data[i] instanceof Date) {
                result[i] = scheduler.templates.format_date(data[i]);
            } else {
                result[i] = data[i];
            }
        }
        return result as Event;
    }

}