import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';
import { AttendanceRecordService } from '../../services/attendance-record.service';
import { MemberService } from '../../services/member.service';
import { AttendanceRecordResponse } from '../../models/attendance-record';
import { LoginService } from '../../services/login.service';

type calendarDay = {
  date: number,
  wasPresent: boolean,
  isToday: boolean
} | null

type calendarWeek = {
  days: calendarDay[],
  daysAttended: number,
  goalReached: boolean,
  isCurrentWeek: boolean
}

@Component({
  selector: 'app-habit-tracker',
  standalone: true,
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './habit-tracker.component.html',
  styleUrl: './habit-tracker.component.css'
})

export class HabitTrackerComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private attendanceRecordService: AttendanceRecordService,
    private memberService : MemberService,
    private loginService : LoginService
  ){
  }
  //registro de asistencias de x miembro
  attendanceRecords : any;
  member: any;
  attendedDays : number[] = [];
  workingDate = new Date();
  memberId = this.loginService.userLoggedIn()? this.loginService.userLogged(): ''; //SOCIO
  daysGoals = 0;
  isCurrentMonth = true;

  get WorkingDate() : number {
    return this.workingDate.getTime()
  }

  calendar : calendarWeek[] = []

  ngOnInit(): void {
      this.loadCalendar();
  }

  checkCurrentMonth() : boolean {
    return this.workingDate.getMonth() == (new Date()).getMonth()
  }

  loadCalendar(){
    this.getAttendanceRecordsByMemberAndDate();
  }

  getAttendanceRecordsByMemberAndDate() {

    this.attendanceRecordService.getAttendanceRecordByMemberAndMonth(this.memberId,this.workingDate.getMonth()+1, this.workingDate.getFullYear()).subscribe(
      (result: any) => {     
        this.attendanceRecords = result.data
        this.getMember();
      },
      (error: any) => {
        console.error("Error al cargar los comentarios", error)
      }
    )
  }

  getMember() {
    this.memberService.getMemberById(this.memberId).subscribe(
      (result: any) => {
        this.member = result.data
        this.attendedDays = this.extractDaysFromDateObjects(this.attendanceRecords)
        this.daysGoals = this.member.weeklyGoal;
        this.calendar = this.buildCalendar(this.workingDate, this.attendedDays, this.daysGoals);
      },
      (error: any) => {
        console.error("Error al cargar los comentarios", error)
      }
    )
  }

  extractDaysFromDateObjects(dates: any[]): number[] {
    const days = dates.map(obj => {
      const date = new Date(obj.date);
      return date.getDate();
    });

    return days;
  }

  private buildCalendar(date: Date, attendedDays: number[], attendedDaysGoal: number): calendarWeek[] {
    const calendarCurrentDate = date.getDate()
    const firstDateDay = (new Date(date.getFullYear(), date.getMonth(), 1)).getDay() // 0: Domingo, 1: Lunes, ..., 6: Sábado
    const daysInMonth = (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate()

    let calendar: calendarWeek[] = []
    let week: calendarWeek = {
      days:new Array<calendarDay>(firstDateDay).fill(null),
      daysAttended: 0,
      goalReached: false,
      isCurrentWeek: false,
    }

    for (let day = 1; day <= daysInMonth; day++) {
      let wasPresent = attendedDays.includes(day)

      if (wasPresent) {
        week.daysAttended++
      }

      let isToday = (day == calendarCurrentDate)

      if (isToday) {
        week.isCurrentWeek = true
      }

      let dayAux: calendarDay = {
        date: day,
        wasPresent: wasPresent,
        isToday: isToday
      }

      week.days.push({...dayAux})

      if (week.days.length === 7) {
        week.goalReached = week.daysAttended >= attendedDaysGoal
        calendar.push({...week})
        week.days = []
        week.daysAttended = 0
        week.goalReached = false
        week.isCurrentWeek = false
      }
    }
    this.checkCurrentMonth()
    return calendar
  }


  addMonths(){
    const today = new Date();
    if(this.workingDate < today){
    this.workingDate.setMonth(this.workingDate.getMonth() + 1);
    this.loadCalendar();
    }
  }

  subtractMonths(){
    console.log(this.workingDate)
    this.workingDate.setMonth(this.workingDate.getMonth() - 1);
    this.loadCalendar();
    console.log(this.workingDate)
  }
}
