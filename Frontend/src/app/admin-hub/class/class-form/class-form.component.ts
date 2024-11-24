import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../../../services/class.service';
import { Class } from '../../../models/class';


@Component({
  selector: 'app-class-form',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule,NgIf],
  templateUrl: './class-form.component.html',
  styleUrl: './class-form.component.css'
})
export class ClassFormComponent implements OnInit {
  action = 'Registrar'
  classForm!: FormGroup
  classId=''
  
  constructor(
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private classService: ClassService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.classForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      schedule: new FormControl("", [Validators.required])
    });
    this.route.url.subscribe(
      (data: any) => {
        switch (data[1].path) {
          case 'new':
            this.action = 'Registrar'
            break
          case 'edit':
            this.action = 'Modificar'
            this.classId = this.route.snapshot.params['id'];
           if(this.classId){
             this.loadClassToUpdate(this.classId)
           }else{
            console.log("El id de la clase no se encontró")
           }
            break
        }
      }
    )
  }
  loadClassToUpdate(id:string){
    this.classService.getClassById(id).subscribe(
      (classData:any) => {
        console.log(classData.data)
        this.classForm.patchValue({
          name: classData.data.name,
          description: classData.data.description,
          schedule: classData.data.schedule
        })
      },
      error=>{
        console.log("Error cargando datos de la clase",error)
      }
    )
  }

  //getters
  get name() {
    return this.classForm.get('name');
  }

  get description() {
    return this.classForm.get('description');
  }

  get schedule() {
    return this.classForm.get('schedule');
  }

  //validaciones
  validateNameRequired() {
    const name = this.name;
    return name?.errors?.['required'] && (name?.dirty || name?.touched);
  }

  validateNameMinLength() {
    const name = this.name;
    return name?.errors?.['minlength'] && (name?.dirty || name?.touched);
  }

  validateNamePattern() {
    const name = this.name;
    return name?.errors?.['pattern'] && (name?.dirty || name?.touched);
  }

  validateDescriptionRequired() {
    const description = this.description;
    return description?.errors?.['required'] && (description?.dirty || description?.touched);
  }

  validateScheduleRequired() {
    const schedule = this.schedule;
    return schedule?.errors?.['required'] && (schedule?.dirty || schedule?.touched);
  }

  onSubmit() {
    if (this.classForm.valid) {
      
      const formData: Class ={
        name: this.name?.value,
        description: this.description?.value,
        schedule: this.schedule?.value
      }

      if(this.action=="Registrar"){
        this.classService.addClass(formData).subscribe(
          res => {
            console.log("Se registro correctamente una clase",res);
            this.router.navigate(['/admin-dashboard/classes'])
          },
          error => console.error(error)
        )
      }else if (this.action == "Modificar") {
        formData._id = this.classId
        console.log(formData)
        this.classService.updateClass(formData).subscribe(
          res => {
            console.log("Clase modificada con éxito", res);
            this.router.navigate(['/admin-dashboard/classes']);
          },
          error => {
            console.error("Error al modificar la clase", error)
          }
        );

    } else {
      console.log('Formulario no válido');
    }
  }
}
}