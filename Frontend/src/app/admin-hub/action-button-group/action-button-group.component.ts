import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { IDemoNgComponentEventType } from '../../test/idemo-ng-component-event-type';

@Component({
  selector: 'app-action-button-group',
  standalone: true,
  imports: [],
  templateUrl: './action-button-group.component.html',
  styleUrl: './action-button-group.component.css'
})
export class ActionButtonGroupComponent implements OnInit{
  constructor() {}
  
  @Output()
  emitter = new Subject<IDemoNgComponentEventType>();

  @Input()
  data = {};

  ngOnInit(): void {}

  editInstance() {
    this.emitter.next({
      cmd: "edit",
      data: this.data,
    });
  }

  deleteInstance() {
    this.emitter.next({
      cmd: "delete",
      data: this.data,
    });
  }

  ngOnDestroy() {
    this.emitter.unsubscribe();
  }
}
