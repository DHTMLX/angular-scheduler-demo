import {Injectable} from "@angular/core";
import {Event} from "../models/event";
import {HttpClient} from "@angular/common/http";
import {HandleError} from "./service.helper";


@Injectable()
export class EventService {
    private eventUrl = "api/events";

    constructor(private http: HttpClient) {}

    get(): Promise<Event[]> {
        return this.http.get(this.eventUrl)
            .toPromise()
            .catch(HandleError);
    }

    insert(event: Event): Promise<Event> {
        return this.http.post(this.eventUrl, event)
            .toPromise()
            .catch(HandleError);
    }

    update(event: Event): Promise<void> {
        return this.http.put(`${this.eventUrl}/${event.id}`, event)
            .toPromise()
            .catch(HandleError);
    }

    remove(id: number): Promise<void> {
        return this.http.delete(`${this.eventUrl}/${id}`)
            .toPromise()
            .catch(HandleError);
    }
}