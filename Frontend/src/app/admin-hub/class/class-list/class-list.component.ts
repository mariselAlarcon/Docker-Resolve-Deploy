import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { ActionButtonGroupComponent } from '../../action-button-group/action-button-group.component';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { IDemoNgComponentEventType } from '../../../test/idemo-ng-component-event-type';
import { ClassService } from '../../../services/class.service';
import { Class } from '../../../models/class';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [DataTablesModule, RouterLink, ActionButtonGroupComponent],
  providers: [],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css'
})
export class ClassListComponent implements OnInit, AfterViewInit {

  dtOptions: ADTSettings = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>()
  classesTraidas : Class[] = []
  
  constructor(
    private router: Router,
    private classService: ClassService
  ){}

  @ViewChild('confirmationModal') confirmationModal! : ElementRef
  @ViewChild('actionButtons') actionButtons!: TemplateRef<ActionButtonGroupComponent>
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  message = ''
  idEventInstance = ''

  ngOnInit(): void {

    setTimeout(()=>{
      const self = this;
      this.dtOptions = {
        language: {
          url: '/assets/datatable.spanish.json',
        }, ajax: (dataTablesParameters: any, callback) => {
          this.classService.getAllClasses().subscribe(resp => {
            console.log(resp.data)
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            });
          })
        },
        columns: [
          { title: 'Clase', data: 'name'},
          { title:'Descripcion', data:'description'},
          { title:'Horario', data:'schedule'},
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
    }

    )
  }
  ngAfterViewInit() {
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
    this.router.navigate([`/admin-dashboard/classes/edit/${this.idEventInstance}`])
  }

  deleteMember(){
    console.log(this.idEventInstance)
    if (this.idEventInstance) {
      this.classService.deleteClass(this.idEventInstance).subscribe(
        (data: any) => {
          console.log("Clase eliminada con exito", data)
          this.rerender()
        },
        (error: any) => {
          console.log("ERROR eliminando una clase", error)
        }
      )
    }
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
