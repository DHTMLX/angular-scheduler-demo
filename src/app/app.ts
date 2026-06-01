import { Component } from '@angular/core';
import { SchedulerComponent } from './components/scheduler/scheduler.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SchedulerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {}
