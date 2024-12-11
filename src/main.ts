import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { DoctorFormComponent } from './app/components/doctor-form/doctor-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DoctorFormComponent],
  template: `
    <div class="app-container">
      <app-doctor-form></app-doctor-form>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 20px;
      background-color: #f5f5f5;
      min-height: 100vh;
    }
  `]
})
export class App {}

bootstrapApplication(App);