import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { CommonModule } from '@angular/common';
import { FeedbackRequest, FeedbackResponse } from '../../models/feedback';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css'
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm!: FormGroup
  feedbacks: any

  member: String = new String(this.loginService.userLogged());

  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private loginService: LoginService
  ) {

  }
  ngOnInit(): void {
    this.loadFeedbacks()
    this.feedbackForm = this.formBuilder.group({
      description: new FormControl("", [Validators.required]),
      score: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
    })
  }

  get description() { return this.feedbackForm.get('description'); }
  get score() { return this.feedbackForm.get('score'); }

  validateDescriptionRequired(): Boolean {
    const description = this.description;
    return description?.errors?.['required'] && (description?.dirty || description?.touched);
  }

  validateScoreRequired(): boolean {
    return !!this.score?.invalid && (this.score?.dirty || this.score?.touched);
  }

  onSubmit() {
    if (this.feedbackForm.valid) {

      

      const feedback: FeedbackRequest = {
        body: this.description?.value,
        date: new Date(),
        score: this.score?.value,
        member: this.member//Socio
      }
      this.feedbackService.addFeedback(feedback).subscribe(
        (result: any) => {
          console.log("Se registro un nuevo comentario", result)
          this.loadFeedbacks()
        }
      )
      this.feedbackForm.reset()
    }
  }

  loadFeedbacks() {

    this.feedbackService.getAllFeedbacks().subscribe(
      (result: any) => {
        console.log("Se cargaron los comentarios", result)
        this.feedbacks = result.data
      },
      (error: any) => {
        console.error("Error al cargar los comentarios", error)
      }
    )
  }

  getStars(score: number): number[] {
    return Array(score).fill(0);
  }
}
