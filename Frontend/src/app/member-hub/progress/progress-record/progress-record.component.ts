import { CommonModule, formatDate, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressService } from '../../../services/progress.service';
import { Progress } from '../../../models/progress';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-progress-record',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule],
  templateUrl: './progress-record.component.html',
  styleUrls: ['./progress-record.component.css']
})
export class ProgressRecordComponent implements OnInit {

  action = 'Registrar';
  progressId = '';
  userId = "6690162d02bf509b25364502"; //SOCIO

  dateProgress = new Date();

  imageBase64post: string | ArrayBuffer | null = null;


  progressForm!: FormGroup;

  imageData: any;
  imgUpdate = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private progressService: ProgressService,
    private memberService: MemberService
  ) { }

  ngOnInit(): void {
    this.progressForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      date: new FormControl(formatDate(this.dateProgress, 'yyyy-MM-dd', 'en'), [Validators.required]),
      img: new FormControl(null),
    });
  }

  // Getters
  get name() {
    return this.progressForm.get('name');
  }
  get weight() {
    return this.progressForm.get('weight');
  }
  get img() {
    return this.progressForm.get('img');
  }
  get date() {
    return this.progressForm.get('date');
  }

  validateNameRequired(): boolean {
    return this.name?.errors?.['required'] ?? false;
  }

  validateWeightRequired(): boolean {
    return this.weight?.errors?.['required'] ?? false;
  }

  validateWeightPattern(): boolean {
    return this.weight?.errors?.['pattern'] ?? false;
  }

  validateDateRequired(): boolean {
    return this.date?.errors?.['required'] ?? false;
  }

  validateDateInvalid(): boolean {
    return this.date?.errors?.['invalidDate'] ?? false;
  }

  onFileChange(event: Event) {
    this.imgUpdate = true;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageBase64post = reader.result;
        this.imageData = this.imageBase64post;
        this.progressForm.patchValue({
          img: this.imageBase64post
        });
      };
    }
  }

  onSubmit(): void {
    if (this.progressForm.valid) {
      const progressNew: Progress = {
        name: this.name?.value,
        weight: this.weight?.value,
        //date: this.date?.value,
        date: new Date(this.date?.value).toISOString(),
        images: [this.img?.value]
      };
      console.log(progressNew);

      this.progressService.addProgress(progressNew).subscribe(
        data => {
          console.log('Progreso registrado', data);
          this.progressId = data.data._id;
          this.addProgressToMember();
          //this.router.navigate(['progresses/tracker'])
        },
        error => {
          console.error('Error al registrar el progreso', error);
        }
      );
    }
  }

  addProgressToMember(){
    this.memberService.addProgress(this.progressId,this.userId).subscribe(
      (data : any) =>{
        console.log('Progreso agregado a miembro correctamente', data);
      }
    )
  }
}