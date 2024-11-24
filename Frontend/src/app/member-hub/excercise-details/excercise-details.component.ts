import { Component, Input } from '@angular/core';
import { ExerciseResponse } from '../../models/exercise';
import { CommonModule } from '@angular/common';
import {Buffer} from "buffer" ;

@Component({
  selector: 'app-excercise-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './excercise-details.component.html',
  styleUrl: './excercise-details.component.css'
})
export class ExcerciseDetailsComponent {
  @Input() exercise: ExerciseResponse | null = null;

  convertToBase64(data: number[], contentType: string): string {
    const buffer = Buffer.from(data);
    const base64String = buffer.toString('base64');
    return `data:${contentType};base64,${base64String}`;
  }
  
}
