import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { IDemoNgComponentEventType } from '../../../test/idemo-ng-component-event-type';
import { ActionButtonGroupComponent } from '../../action-button-group/action-button-group.component';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { UserService } from '../../../services/user.service';
import { UserResponse } from '../../../models/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [DataTablesModule, RouterLink, ActionButtonGroupComponent],
  providers: [DatePipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})

export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: ADTSettings = {}
  dtTrigger: Subject<any> = new Subject()

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private userService: UserService,
  ) { }

  apiResponseExample = [
    {
      "personalInformation": {
        "firstName": "John Wick",
        "lastName": "Doe",
        "dni": "12345678",
        "address": "Dirección",
        "phoneNumber": "12345672",
        "dateOfBirth": "1990-01-01T00:00:00.000Z"
      },
      "img": {
        "data": {
          "type": "Buffer",
          "data": []
        },
        "contentType": "image/png"
      },
      "_id": "6685a0e7d587e0ccac1a9623",
      "username": "john_doe",
      "password": "Password124",
      "email": "john.doe@example.com",
      "role": {
        "_id": "6684bc7220405336cc3abc37",
        "name": "Dueño"
      },
      "__v": 0
    }
  ]

  @ViewChild('confirmationModal') confirmationModal!: ElementRef
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
          this.userService.getUsers().subscribe(resp => {
            console.log(resp.data)
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            });
          })
        },
        columns: [
          { title: 'Usuario', data: 'username' },
          { title: 'Email', data: 'email' },
          { title: 'Rol', data: 'role.name' },
          { title: 'Nombre', data: 'personalInformation.firstName' },
          { title: 'Apellido', data: 'personalInformation.lastName' },
          { title: 'DNI', data: 'personalInformation.dni' },
          { title: 'Dirección', data: 'personalInformation.address' },
          { title: 'Num. de Télefono', data: 'personalInformation.phoneNumber' },
          {
            title: 'Fecha de Nacimiento',
            data: 'personalInformation.dateOfBirth',
            ngPipeInstance: this.datePipe,
            ngPipeArgs: ['mediumDate', 'format']
          },
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
      };
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
    this.router.navigate([`/admin-dashboard/users/edit/${this.idEventInstance}`])
  }

  deleteMember() {
    console.log(this.idEventInstance)
    if (this.idEventInstance) {
      this.userService.deleteUserById(this.idEventInstance).subscribe(
        (data: any) => {
          console.log("Usuario eliminado con exito", data)
        },
        (error: any) => {
          console.log("ERROR eliminando user", error)
        }
      )
    }
  }

  loadTable() {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.apiResponseExample = [...data.data]
        this.reRender()
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  private reRender() {
    console.log(this.dtElement)
    this.dtElement.dtInstance.then(dtInstance => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.dtOptions);
    });
  }

  private confirmateDeletion() {
    this.confirmationModal.nativeElement.click()
  }
}
