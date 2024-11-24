import { Component, Input } from '@angular/core';
import { ExerciseResponse } from '../../models/exercise';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RoutineService } from '../../services/routine.service';
import { RoutineRequest } from '../../models/routine';
import { MemberService } from '../../services/member.service';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-routine-creator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './routine-creator.component.html',
  styleUrl: './routine-creator.component.css'
})
export class RoutineCreatorComponent {
  @Input() routine: ExerciseResponse[] = [];
  routineCreate!: RoutineRequest
//hacer binding con esto
  nameRoutine=''
  muscleGroups: String[] = []
  exercises: String[] = []
  routineId = "";

  userId = this.loginService.userLoggedIn()? this.loginService.userLogged(): ''; //SOCIO

  constructor(
    private routineService: RoutineService,
    private memberService : MemberService,
    private loginService: LoginService
  ){}

  getMuscleGroupName() {
    const muscleGroupSet = new Set<string>();

    this.routine.forEach(ejercicio => {
      muscleGroupSet.add(ejercicio.muscleGroup.valueOf());
    });

    this.muscleGroups = Array.from(muscleGroupSet);
  }
  
  getExerciseIds() {
    this.routine.forEach(ejercicio => {
      this.exercises.push(ejercicio._id);
    });
  }
  createRoutine(){
    this.getMuscleGroupName();
    this.getExerciseIds();
    
    this.routineCreate = {
      name: this.nameRoutine,
      exercises: this.exercises,
      releaseDate: new Date(),
      muscleGroupsSelected: this.muscleGroups
    }
    this.routineService.addRoutine(this.routineCreate).subscribe(
      (data : any) =>{
        console.log('Rutina creada correctamente', data);
        this.routineId = data.data._id;
        this.addRoutineToMember();
      }
    )
  }

  addRoutineToMember(){
    this.memberService.addRoutine(this.routineId,this.userId).subscribe(
      (data : any) =>{
        console.log('Rutina agregada a miembro correctamente', data);
      }
    )
  }

  borrarEjercicio(indice: number){
    this.routine.splice(indice, 1)
  }

}
