import { Component, OnInit, Input } from '@angular/core';

import { CalendarData } from '../classes/calendarData';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() calendarData: CalendarData[];

  constructor() { }

  ngOnInit() {
  }

}
