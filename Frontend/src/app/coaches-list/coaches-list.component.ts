import { Component } from '@angular/core';
import { Coach } from '../models/coach';
import { CoachService } from '../services/coach.service';

@Component({
  selector: 'app-coaches-list',
  standalone: true,
  imports: [],
  templateUrl: './coaches-list.component.html',
  styleUrl: './coaches-list.component.css'
})
export class CoachesListComponent {
  coachesList: Coach[] = [];
  isLoading = true;

  constructor(private coachService: CoachService) { }

  ngOnInit(): void {
    this.coachService.getAllCoaches().subscribe(
      resp => {
        console.log(resp)
        this.coachesList = [...resp.data]
        this.isLoading = false
        this.coachesList.forEach(coach => {
          if (coach.img) {
            this.processImage(coach);
          }
        });
      }
    );
  }

  processImage(coach: any): void {
    setTimeout(() => {
      coach.imgSrc = `data:${coach.img.contentType};base64,${this.arrayBufferToBase64(coach.img.data.data)}`;
      coach.isLoadingImage = false;
    }, 0); // Procesar la imagen de manera asincrónica
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
