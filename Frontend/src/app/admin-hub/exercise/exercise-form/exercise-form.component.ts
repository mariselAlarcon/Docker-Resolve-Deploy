import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from '../../../services/exercise.service';
import { ExerciseRequest, ExerciseResponse } from '../../../models/exercise';
import { MuscleGroupService } from '../../../services/muscle-group.service';
import { MuscleGroup } from '../../../models/muscle-group';
import { data } from 'jquery';


@Component({
  selector: 'app-exercise-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, JsonPipe, NgFor],
  templateUrl: './exercise-form.component.html',
  styleUrl: './exercise-form.component.css'
})
export class ExerciseFormComponent {
  action = 'Registrar';
  exerciseForm!: FormGroup;
  muscleGroups: MuscleGroup[] = []
  imageBase64s: string[] = [];
  ejercicioId = ''

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private musculosService: MuscleGroupService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadMusculos()

    this.exerciseForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      set: [0, [Validators.required, Validators.min(1)]],
      rep: [0, [Validators.required, Validators.min(1)]],
      accessory: [''],
      instruction: ['', [Validators.required]],
      difficult: ['', [Validators.required]],
      type: ['', [Validators.required]],
      muscleGroup: ['', [Validators.required]]
    });

    this.route.url.subscribe((data: any) => {
      switch (data[1].path) {
        case 'new':
          this.action = 'Registrar';
          break;
        case 'edit':
          this.action = 'Modificar';
          this.ejercicioId = this.route.snapshot.paramMap.get('id')!
          if (this.ejercicioId) {
            
          }
          // Lógica para cargar datos del ejercicio a editar
          break;
      }
    });
  }

   // Getters para acceder a los controles del formulario
   get name() {
    return this.exerciseForm.get('name') as FormControl;
  }

  get set() {
    return this.exerciseForm.get('set') as FormControl;
  }

  get rep() {
    return this.exerciseForm.get('rep') as FormControl;
  }

  get accessory() {
    return this.exerciseForm.get('accessory') as FormControl;
  }

  get instruction() {
    return this.exerciseForm.get('instruction') as FormControl;
  }

  get difficult() {
    return this.exerciseForm.get('difficult') as FormControl;
  }

  get type() {
    return this.exerciseForm.get('type') as FormControl;
  }

  get muscleGroup() {
    return this.exerciseForm.get('muscleGroup') as FormControl;
  }

  // Validaciones específicas
  validateSetRequired() {
    const set = this.set;
    return set?.errors?.['required'] && (set?.dirty || set?.touched);
  }

  validateSetMin() {
    const set = this.set;
    return set?.errors?.['min'] && (set?.dirty || set?.touched);
  }

  validateRepRequired() {
    const rep = this.rep;
    return rep?.errors?.['required'] && (rep?.dirty || rep?.touched);
  }

  validateRepMin() {
    const rep = this.rep;
    return rep?.errors?.['min'] && (rep?.dirty || rep?.touched);
  }

  validateInstructionRequired() {
    const instruction = this.instruction;
    return instruction?.errors?.['required'] && (instruction?.dirty || instruction?.touched);
  }

  validateDifficultRequired() {
    const difficult = this.difficult;
    return difficult?.errors?.['required'] && (difficult?.dirty || difficult?.touched);
  }

  validateTypeRequired() {
    const type = this.type;
    return type?.errors?.['required'] && (type?.dirty || type?.touched);
  }

  validateMuscleGroupRequired() {
    const muscleGroup = this.muscleGroup;
    return muscleGroup?.errors?.['required'] && (muscleGroup?.dirty || muscleGroup?.touched);
  }

  onFileChange(event: any) {
    this.imageBase64s = [];
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageBase64s.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit() {
    if (this.exerciseForm.valid) {
     

      if(this.action=="Registrar"){
        const formData: ExerciseRequest = this.exerciseForm.value;
      formData.images = this.imageBase64s;
      console.log(formData);
      this.exerciseService.addExercise(formData).subscribe(
        (data: any) => {
          console.log('Ejercicio guardado correctamente', data);
          this.router.navigate(['/'])
        },
        (error: any) => {
          console.error('Error al guardar el ejercicio', error);
        }
      );
      }else{
        if(this.action=="Modificar"){
          const formData: ExerciseResponse = this.exerciseForm.value;
      formData.images = this.imageBase64s;
      console.log(formData);
          formData._id = this.ejercicioId

          this.exerciseService.updateExercise(formData).subscribe(
            data=>console.log("EXITO UPDATE EJERCICIO", data),
            error=>console.log("ERROR UPDATE EJERCICIO", error)
          )
        }
      }
      
    } else {
      console.log('Formulario no válido');
    }
  }
  loadMusculos(){
    this.musculosService.getAllMuscleGroups().subscribe(
      data=>{
        
        this.muscleGroups = data.data
console.log("MUSCULOS",this.muscleGroups)
      },error=>console.log("ERROR TRAYENDO LOS MUCULOS",error)
    )
  }

  loadExerciseData(idEjercicio: string): void {
    this.exerciseService.getExerciseById(idEjercicio).subscribe(
      (result) => {
        const ejercicio = result.data; // Suponiendo que 'result.data' contiene los datos del ejercicio

        this.exerciseForm.patchValue({
          name: ejercicio.name,
          set: ejercicio.set,
          rep: ejercicio.rep,
          accessory: ejercicio.accessory,
          instruction: ejercicio.instruction,
          difficult: ejercicio.difficult,
          type: ejercicio.type,
          muscleGroup: ejercicio.muscleGroup 
        });
      })
    }
}
