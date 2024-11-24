import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHubLayoutComponent } from './admin-hub/admin-hub-layout/admin-hub-layout.component';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-419'

registerLocaleData(localePy, 'es')

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminHubLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'resolve-gym-website';
}
