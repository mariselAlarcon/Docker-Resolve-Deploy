import { Component, OnInit } from '@angular/core';
import { RoutineResponse } from '../../models/routine';
import { MemberService } from '../../services/member.service';
import { CommonModule } from '@angular/common';
import { RoutineService } from '../../services/routine.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-saved-routines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-routines.component.html',
  styleUrl: './saved-routines.component.css'
})
export class SavedRoutinesComponent implements OnInit {
  routines: any =[]

  constructor(
    private memberService: MemberService,
    private routinesService: RoutineService,
    private loginService: LoginService
  ){  }

  ngOnInit(): void {
    const userId = this.loginService.userLoggedIn()? this.loginService.userLogged(): '';
    this.loadRoutines(userId);
  }

  loadRoutines(idMember: string){
    this.memberService.getRoutinesByMember(idMember) .subscribe(
      (data:any) => {
        console.log(data)
      this.routines = data.data.routines;
    },
    (error:any)=>{
      console.error("Error trayendo rutinas del socio",error);
    }
  ); 
  }
}
