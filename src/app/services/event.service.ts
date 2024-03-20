import {Injectable} from "@angular/core";
import {Event} from "../models/event";
import {HttpClient} from "@angular/common/http";
import {HandleError} from "./service.helper";
import {firstValueFrom} from "rxjs";

@Injectable()
export class EventService {
    private eventUrl = "api/events";

    constructor(private http: HttpClient) {}

    get(): Promise<Event[]>{
        return firstValueFrom(this.http.get(this.eventUrl))
            .catch(HandleError);
    }

    insert(event: Event): Promise<Event> {
        return firstValueFrom(this.http.post(this.eventUrl, event))
            .catch(HandleError);
    }

    update(event: Event): Promise<void> {
        return firstValueFrom(this.http.put(`${this.eventUrl}/${event.id}`, event))
            .catch(HandleError);
    }

    remove(id: number): Promise<void> {
        return firstValueFrom(this.http.delete(`${this.eventUrl}/${id}`))
            .catch(HandleError);
}
}