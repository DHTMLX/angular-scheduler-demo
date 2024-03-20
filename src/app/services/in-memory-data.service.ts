import {InMemoryDbService} from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let events = [
            {id: 1, start_date: "2024-10-01 06:00", end_date: "2024-10-01 13:00", text: "Event 1"},
            {id: 2, start_date: "2024-10-03 07:00", end_date: "2024-10-03 12:00", text: "Event 2"}
        ];
    return {events};
    }
}