import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { ActionButtonGroupComponent } from '../../action-button-group/action-button-group.component';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { IDemoNgComponentEventType } from '../../../test/idemo-ng-component-event-type';
import { CoachService } from '../../../services/coach.service';
import { Coach } from '../../../models/coach';

@Component({
  selector: 'app-coach-list',
  standalone: true,
  imports: [DataTablesModule, RouterLink, ActionButtonGroupComponent],
  providers: [],
  templateUrl: './coach-list.component.html',
  styleUrl: './coach-list.component.css'
})
export class CoachListComponent implements OnInit, AfterViewInit {

  dtOptions: ADTSettings = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>()
  coachesTraidos!: Coach[]

  constructor(
    private router: Router,
    private coachService: CoachService
  ) { }

  apiResponseExample = [
    {
      "_id": "lnjknk8",
      "fullname": "Marcos Gregory",
      "email": "marcosG@gmail.com",
      "workArea": "funcional",
      "img": {
        "data": {
          "type": "Buffer",
          "data": []
        },
        "contentType": "image/png",
      },
      "age": "29",
      "description": "5 años de experiencia",
      "schedule": "14 hs a 19hs"
    }
  ]

  @ViewChild('confirmationModal') confirmationModal!: ElementRef
  @ViewChild('actionButtons') actionButtons!: TemplateRef<ActionButtonGroupComponent>
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  message = ''
  idEventInstance = ''

  ngOnInit(): void {
    setTimeout(() => {
      const self = this;
      this.dtOptions = {
        language: {
          url: '/assets/datatable.spanish.json',
        }, ajax: (dataTablesParameters: any, callback) => {
          this.coachService.getAllCoaches().subscribe(resp => {
            console.log(resp.data)
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            });
          })
        },
        columns: [
          { title: 'Coach', data: 'fullname' },
          { title: 'email', data: 'email' },
          { title: 'area', data: 'workArea.name' },
          { title: 'Descripcion', data: 'description' },
          { title: 'Edad', data: 'age' },
          { title: 'Horario', data: 'schedule' },
          {
            title: 'Acciones',
            data: null,
            orderable: false,
            defaultContent: '',
            ngTemplateRef: {
              ref: this.actionButtons,
              context: {
                // needed for capturing events inside <ng-template>
                captureEvents: self.onCaptureEvent.bind(self)
              }
            }
          }
        ]
      }
    })
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.dtTrigger.next(this.dtOptions);
    }, 200);
  }

  onCaptureEvent(event: IDemoNgComponentEventType) {
    this.idEventInstance = event.data._id
    if (event.cmd == 'edit') {
      this.editMember()
    }
    if (event.cmd == 'delete') {
      this.confirmateDeletion()
    }
    this.message = `Event '${event.cmd}' with data '${JSON.stringify(event.data)}`;
    console.log(this.message)
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  editMember() {
    this.router.navigate([`/admin-dashboard/coaches/edit/${this.idEventInstance}`])
  }

  deleteMember() {
    if (this.idEventInstance) {
      this.coachService.deleteCoach(this.idEventInstance).subscribe(
        (data: any) => {
          console.log("Coach eliminado", data)
          this.rerender()
        },
        error => console.log("Error eliminando coach", error)
      )
    }
  }

  private confirmateDeletion() {
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
