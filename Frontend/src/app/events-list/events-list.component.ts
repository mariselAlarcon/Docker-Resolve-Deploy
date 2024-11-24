import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { EventI } from '../models/event';
import { DatePipe } from '@angular/common';
import { ClassService } from '../services/class.service';
import { Class } from '../models/class';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent implements OnInit{
  eventList : EventI[] = []
  classList : Class[] = []
  
  constructor(
    private eventService : EventService,
    private classService : ClassService
  ){}

  ngOnInit(): void {
      this.eventService.getAllEvents().subscribe(
        (resp:any)=>{
          console.log(resp.data)
          this.eventList = [...resp.data]
          console.log(this.eventList)
        }
      )
      this.classService.getAllClasses().subscribe(
        (resp:any)=>{
          console.log(resp.data)
          this.classList = [...resp.data]
        }
      )
  }
}
