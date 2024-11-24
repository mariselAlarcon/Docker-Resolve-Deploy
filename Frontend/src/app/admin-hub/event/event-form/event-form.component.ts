import { JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventI } from '../../../models/event';
import { EventService } from '../../../services/event.service';


@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent {
  action = 'Registrar';
  eventForm!: FormGroup;
  idModificar: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      date: new FormControl("", [Validators.required]),
      startTime: new FormControl("", [Validators.required]),
      finishTime: new FormControl("", [Validators.required])
    });

    this.route.url.subscribe((data: any) => {
      switch (data[1].path) {
        case 'new':
          this.action = 'Registrar';
          break;
        case 'edit':
          this.action = 'Modificar';
          this.route.params.subscribe(params => {
            if(params['id']){
              this.idModificar = params['id'];
              console.log(this.idModificar);
              this.loadEventoToModify(this.idModificar)
            }
          })
          if(this.idModificar){
            this.loadEventData(this.idModificar)
          }
          break;
      }
    });
  }

  // Getters para acceder a los controles del formulario
  get name() {
    return this.eventForm.get('name');
  }

  get description() {
    return this.eventForm.get('description');
  }

  get date() {
    return this.eventForm.get('date');
  }

  get startTime() {
    return this.eventForm.get('startTime');
  }

  get finishTime() {
    return this.eventForm.get('finishTime');
  }

  // Validaciones
  validateNameRequired() {
    const name = this.name;
    return name?.errors?.['required'] && (name?.dirty || name?.touched);
  }

  validateDescriptionRequired() {
    const description = this.description;
    return description?.errors?.['required'] && (description?.dirty || description?.touched);
  }

  validateDateRequired() {
    const date = this.date;
    return date?.errors?.['required'] && (date?.dirty || date?.touched);
  }

  validateStartTimeRequired() {
    const startTime = this.startTime;
    return startTime?.errors?.['required'] && (startTime?.dirty || startTime?.touched);
  }

  validateFinishTimeRequired() {
    const finishTime = this.finishTime;
    return finishTime?.errors?.['required'] && (finishTime?.dirty || finishTime?.touched);
  }

  loadEventoToModify(id:string){
    this.eventService.getEventById(id).subscribe(
      resp => {
        console.log(resp.data)
        let evento: EventI = {...resp.data}
        this.eventForm.patchValue({
          name: evento.name,
          description: evento.description,
          date: this.formatDate(new Date(evento.date)),
          startTime: this.formatTime(new Date(evento.startTime)),
          finishTime: this.formatTime(new Date(evento.finishTime)),
        })
      }
    )
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  formatTime(date: Date): string {
    const hours = ('0' + date.getUTCHours()).slice(-2);
    const minutes = ('0' + date.getUTCMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const eventData: EventI = {
        name: this.name?.value,
        description: this.description?.value,
        date: this.date?.value,
        startTime: this.startTime?.value,
        finishTime: this.finishTime?.value
      }
      console.log(eventData);
      if (this.action == "Registrar") {
        this.eventService.addEvent(eventData).subscribe(
          (response) => console.log(response),
          (error) => console.error(error)
        )
        this.router.navigate(['/admin-dashboard/events/'])
      }
      if (this.action == "Modificar") {
        eventData._id = this.idModificar;
        console.log(eventData)
        this.eventService.updateEvent(eventData).subscribe(
          (response) => {
            console.log(response)
            this.router.navigate(['/admin-dashboard/events/'])
          },
          (error) => console.error(error)
        )
      }
    } else {
      console.log('Formulario no válido');
    }
  }
  loadEventData(id: string): void {
    this.eventService.getEventById(id).subscribe(
      (result) => {
        const event = result.data;
        this.eventForm.patchValue({
          name: event.name,
          description: event.description,
          date: this.extractDate(event.date),
          startTime: this.extractTime(event.startTime),
          finishTime: this.extractTime(event.finishTime)
        });
      },
      (error) => {
        console.error('Error cargando los datos del evento', error);
      }
    );
  }
  private extractDate(dateTimeString: string): string {
    return dateTimeString.split('T')[0];
  }
  
  private extractTime(dateTimeString: string): string {
    return dateTimeString.split('T')[1].slice(0, 5);
  }
}
