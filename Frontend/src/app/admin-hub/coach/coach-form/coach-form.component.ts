import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoachService } from '../../../services/coach.service';
import { Coach } from '../../../models/coach';

@Component({
  selector: 'app-coach-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, JsonPipe],
  templateUrl: './coach-form.component.html',
  styleUrl: './coach-form.component.css'
})
export class CoachFormComponent implements OnInit {
  action = 'Registrar'
  coachForm!: FormGroup
  imageBase64: string | ArrayBuffer | null = null;
  coachId: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private coachService: CoachService
  ) { }

  ngOnInit(): void {
    this.coachForm = this.formBuilder.group({
      fullname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z\\s]+$')]),
      email: new FormControl("", [Validators.required, Validators.email]),
      workArea: new FormControl("", [Validators.required]),
      img: new FormControl(null),
      age: new FormControl("", [Validators.required, Validators.min(1), Validators.max(120)]),
      description: new FormControl("", [Validators.required]),
      schedule: new FormControl("", [Validators.required])
    })
    this.route.url.subscribe(
      (data: any) => {
        switch (data[1].path) {
          case 'new':
            this.action = 'Registrar'
            break
          case 'edit':
            this.action = 'Modificar'
            this.coachId = this.route.snapshot.params['id'];
            if (this.coachId) {
              this.loadCoachToModify(this.coachId)
            } else {
              console.log("El id de la clase no se encontró")
            }
            break
        }
      }
    )
  }

  loadCoachToModify(id: string) {
    this.coachService.getCoachById(id).subscribe(
      resp => {
        console.log(resp.data)
        let coach = resp.data
        this.coachForm.patchValue(
          {
            fullname: coach.fullname,
            email: coach.email,
            workArea: coach.workArea,
            age: coach.age,
            description: coach.description,
            schedule: coach.schedule
          }
        )
        this.imageBase64 
      }
    )
  }

  /*private convertToBase64(data: number[], contentType: string): string {
    const buffer = Buffer.from(data);
    const base64String = buffer.toString('base64');
    return `data:${contentType};base64,${base64String}`;
  }
*/
  //ELIMINAR
  getFormValuesWithoutImage() {
    const formValues = { ...this.coachForm.value };
    return formValues;
  }
  //getters para mejorar redibilidad
  get fullname() {
    return this.coachForm.get('fullname');
  }

  get email() {
    return this.coachForm.get('email');
  }

  get workArea() {
    return this.coachForm.get('workArea');
  }

  get img() {
    return this.coachForm.get('img');
  }

  get age() {
    return this.coachForm.get('age');
  }

  get description() {
    return this.coachForm.get('description');
  }

  get schedule() {
    return this.coachForm.get('schedule');
  }

  //validaciones

  validateFullnameRequired(): boolean {
    return this.coachForm.get('fullname')?.errors?.['required'] ?? false;
  }


  validateFullnameMinLength(): boolean {
    return this.coachForm.get('fullname')?.errors?.['minlength'] ?? false;
  }

  validateFullnamePattern(): boolean {
    return this.coachForm.get('fullname')?.errors?.['pattern'] ?? false;
  }

  validateEmailRequired(): boolean {
    return this.coachForm.get('email')?.errors?.['required'] ?? false;
  }

  validateEmailPattern(): boolean {
    return this.coachForm.get('email')?.errors?.['email'] ?? false;
  }

  validateWorkAreaRequired(): boolean {
    return this.coachForm.get('workArea')?.errors?.['required'] ?? false;
  }

  validateAgeRequired(): boolean {
    return this.coachForm.get('age')?.errors?.['required'] ?? false;
  }

  validateAgeRange(): boolean {
    return (this.coachForm.get('age')?.errors?.['min'] ?? false) || (this.coachForm.get('age')?.errors?.['max'] ?? false);
  }

  validateDescriptionRequired(): boolean {
    return this.coachForm.get('description')?.errors?.['required'] ?? false;
  }

  validateScheduleRequired(): boolean {
    return this.coachForm.get('schedule')?.errors?.['required'] ?? false;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageBase64 = reader.result;
        this.coachForm.patchValue({
          img: this.imageBase64
        });
      };
    }
  }

  onSubmit() {
    if (this.coachForm.valid) {

      const coach: Coach = {
        fullname: this.fullname?.value,
        email: this.email?.value,
        workArea: this.workArea?.value,
        img: this.img?.value,
        age: this.age?.value,
        description: this.description?.value,
        schedule: this.schedule?.value
      }
      console.log(coach);
      if (this.action == "Registrar") {
        this.coachService.addCoach(coach).subscribe(
          (response) => {
            console.log('Coach registrado correctamente', response);
          },
          (error) => {
            console.error('Error al registrar el coach', error);
          }
        )
      }

    } else {
      console.log('Formulario no válido');
    }
  }

}
