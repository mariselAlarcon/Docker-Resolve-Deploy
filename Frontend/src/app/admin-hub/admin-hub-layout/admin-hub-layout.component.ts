import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarPlus, faDumbbell, faFireFlameCurved, faGraduationCap, faPersonChalkboard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-hub-layout',
  standalone: true,
  imports: [FontAwesomeModule, RouterOutlet, RouterLink],
  templateUrl: './admin-hub-layout.component.html',
  styleUrl: './admin-hub-layout.component.css'
})
export class AdminHubLayoutComponent implements OnInit{
  faDumbbell = faDumbbell
  faFireFlameCurved = faFireFlameCurved
  faPersonChalkboardfa = faPersonChalkboard
  faGraduationCap = faGraduationCap
  faCalendarPlus = faCalendarPlus

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement.ownerDocument.documentElement, 'data-bs-theme', 'light');
  }
}
