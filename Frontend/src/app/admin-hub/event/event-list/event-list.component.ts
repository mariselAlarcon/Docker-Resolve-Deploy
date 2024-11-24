import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { ActionButtonGroupComponent } from '../../action-button-group/action-button-group.component';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { IDemoNgComponentEventType } from '../../../test/idemo-ng-component-event-type';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterLink, DataTablesModule, ActionButtonGroupComponent],
  providers:[DatePipe],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit, AfterViewInit {
  
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>()

  constructor(private eventService: EventService, private router : Router, private datePipe: DatePipe){}

  @ViewChild('confirmationModal') confirmationModal! : ElementRef
  @ViewChild('actionButtons') actionButtons!: TemplateRef<ActionButtonGroupComponent>
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  message = ''
  idEventInstance = ''

  ngOnInit(): void {
    setTimeout(() => {
      const self = this;
      this.dtOptions = {
        language: {
          url: '/assets/datatable.spanish.json',
        },
        ajax: (dataTablesParameters: any, callback) => {
          this.eventService.getAllEvents().subscribe(resp => {
            console.log(resp.data)
            callback({
              data: resp.data
            });
          })
        },
        columns: [
          { title: 'Evento', data: 'name' },
          { title:'Descripcion', data:'description'},
          { title:'Fecha', data:'date', render: (data: any) => this.datePipe.transform(data, 'shortDate')},
          { title: 'Inicia', data:'startTime', render: (data: any) => this.datePipe.transform(data, 'shortTime')},
          { title: 'Termina', data: 'finishTime', render: (data: any) => this.datePipe.transform(data, 'shortTime')},
  
          {
            title: 'Acciones',
            data: null,
            orderable: false,
            defaultContent: '',
            ngTemplateRef: {
              ref: this.actionButtons,
              context:{
                // needed for capturing events inside <ng-template>
                captureEvents: self.onCaptureEvent.bind(self)
              }
            }
          }
        ]
      }
    })
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next(this.dtOptions);
    }, 200);
  }
  onCaptureEvent(event: IDemoNgComponentEventType) {
    this.idEventInstance = event.data._id
    if(event.cmd == 'edit'){
      this.editMember()
    }
    if(event.cmd == 'delete'){
      this.confirmateDeletion()
    }
    this.message = `Event '${event.cmd}' with data '${JSON.stringify(event.data)}`;
    console.log(this.message)
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  editMember(){
    this.router.navigate([`/admin-dashboard/events/edit/${this.idEventInstance}`])
  }

  deleteMember() {
    this.eventService.deleteEvent(this.idEventInstance).subscribe(
      (response) => {
        console.log(response);
        this.rerender()
      },
      (error) => console.error(error)
    );
  }

  private confirmateDeletion(){
    this.confirmationModal.nativeElement.click()
  }

  rerender(): void {
    this.dtElement.dtInstance.then(dtInstance => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.dtOptions);
    });
  }
}
