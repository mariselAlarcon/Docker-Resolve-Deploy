import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { AttendanceRecordService } from '../../services/attendance-record.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-attendance-history',
  standalone: true,
  imports: [DataTablesModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './attendance-history.component.html',
  styleUrl: './attendance-history.component.css'
})
export class AttendanceHistoryComponent implements OnInit {
  dtOptions: ADTSettings = {}
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>()
  attendanceRecords: any[] = [];
  constructor(private attendanceRecordService: AttendanceRecordService,
    private datePipe: DatePipe,
  ){}

  ngOnInit(): void {
    
    this.dtOptions = {
      language: {
        url: '/assets/datatable.spanish.json',
      },
      ajax: (dataTablesParameters: any, callback) => {
        this.attendanceRecordService.getAttendanceRecords().subscribe(resp => {
          console.log(resp.data)
          callback({
            data: resp.data
          });
        })
      },
      columns: [
        { title: 'Fecha', data: 'date', render: (data: any) => this.datePipe.transform(data, 'shortDate') },
        { title: 'Hora', data: 'date', render: (data: any) => this.datePipe.transform(data, 'shortTime')},
        { title: 'Usuario', data: 'member.username' },
        { title: 'Nombre', data: 'member.personalInformation.firstName'},
        { title: 'Apellido', data: 'member.personalInformation.lastName'},
      ],
      columnDefs: [
        {
          targets: [0],
          orderData: [0, 1]
        },
        {
          targets: [1],
          orderData: [1, 0]
        },
      ]

    }
    
  }
}