import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AttendanceRecordService } from '../../services/attendance-record.service';
import { FormsModule } from '@angular/forms';
import { MemberService } from '../../services/member.service';
import { AttendanceRecordRequest } from '../../models/attendance-record';

@Component({
  selector: 'app-record-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './record-attendance.component.html',
  styleUrl: './record-attendance.component.css'
})
export class RecordAttendanceComponent {
  tableAttendance = true

  dni: string = '';
  member: any;
  existMember: boolean= true;
  memberFound : boolean = false
  attendanceRecord!: AttendanceRecordRequest;

  constructor(
    private  attendanceService: AttendanceRecordService,
    private memberService: MemberService
  ){

  }

  getMember() {
    this.memberFound = false;
    this.memberService.getMemberByDNI(this.dni).subscribe(
      (data: any) => {
        console.log(data)
        this.member = data.data;
        this.addAttendanceRecord();
        this.existMember = true;
      },
      (error: any) => {
        console.error("Error al cargar los comentarios", error)
        this.existMember = false;
        this.memberFound = false;
      }
    )
  }

  addAttendanceRecord(){
      this.attendanceRecord= {
        date: new Date(),
        member: this.member._id
      }

      this.attendanceService.addAttendanceRecord(this.attendanceRecord).subscribe(
        (data : any) =>{
          console.log('Asistencia creada correctamente', data);
          this.memberFound = true;
        }
      )
  }
}
