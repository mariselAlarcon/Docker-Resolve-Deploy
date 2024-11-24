import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { ActionButtonGroupComponent } from '../../action-button-group/action-button-group.component';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { IDemoNgComponentEventType } from '../../../test/idemo-ng-component-event-type';
import { ExerciseService } from '../../../services/exercise.service';
import { MuscleGroupService } from '../../../services/muscle-group.service';
import { ExerciseResponse } from '../../../models/exercise';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [DataTablesModule, RouterLink,ActionButtonGroupComponent ],
  providers: [DatePipe],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})
export class ExerciseListComponent implements OnInit, AfterViewInit{

  dtOptions: ADTSettings = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>()
  nameMusculo = ''

  constructor(private datePipe: DatePipe, 
    private router: Router,
    private ejercicioService: ExerciseService,
    private musculosService: MuscleGroupService
  ) {
    
  }

    @ViewChild('confirmationModal') confirmationModal! : ElementRef
    @ViewChild('actionButtons') actionButtons!: TemplateRef<ActionButtonGroupComponent>
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
          this.ejercicioService.getAllExercises().subscribe(resp => {
            console.log("AQUII",resp.data)
   
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
              
            }
          );
          })
        },
        columns: [
          { title: 'Ejercicio', data: 'name'},
          { title: 'Set', data:'set'},
          { title: 'Repeticiones', data:'rep'},
          { title: 'Instrucciones', data:'instruction'},
          { title: 'Dificultad', data: 'difficult'},
          { title: 'Tipo', data: 'type'},
        //  { title: 'Músculo', data:'muscleGroup'},
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
  ngAfterViewInit() {
    setTimeout(() => {
      // race condition fails unit tests if dtOptions isn't sent with dtTrigger
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
    this.router.navigate([`/admin-dashboard/exercises/edit/${this.idEventInstance}`])
  }

  deleteMember(){
    console.log(this.idEventInstance)
    if (this.idEventInstance) {
      this.ejercicioService.deleteExercise(this.idEventInstance).subscribe(
        (data: any) => {
          console.log("EJERCICIO eliminado con exito", data)
          window.location.reload();
        },
        (error: any) => {
          console.log("ERROR eliminando EJERCICIO", error)
        }
      )
    }
  }

  private confirmateDeletion(){
    this.confirmationModal.nativeElement.click()
  }

  cargarNameMusculo(id:String){
    this.musculosService.getMuscleGroupById(id).subscribe(
      data=>{
        console.log("MUSCULO TRAIDO",data)
        this.nameMusculo = data.data.name
      },error => console.log("ERROR TRAYENDO EL MUSCULO",error)
    )
  }
}
