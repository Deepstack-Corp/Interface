import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ExamFormComponent } from '../exam-form/exam-form.component';
import { DoctorForm } from '../../models/exam.model';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ExamFormComponent],
  template: `
    <div class="doctor-form">
      <h2>Configuração do Atendimento Médico</h2>
      
      <form [formGroup]="doctorForm" (ngSubmit)="onSubmit()" class="form-container">
        <div class="form-field">
          <label for="name">Nome do Médico:</label>
          <input id="name" type="text" formControlName="name">
        </div>

        <div class="form-field">
          <label for="specialty">Especialidade:</label>
          <input id="specialty" type="text" formControlName="specialty">
        </div>

        <div class="exams-section">
          <h3>Exames</h3>
          <button type="button" (click)="addExam()" class="add-button">
            Adicionar Exame
          </button>

          <div formArrayName="exams">
            <div *ngFor="let exam of exams.controls; let i=index">
              <app-exam-form [formGroupName]="i"></app-exam-form>
              <button type="button" (click)="removeExam(i)" class="remove-button">
                Remover Exame
              </button>
            </div>
          </div>
        </div>

        <div class="portfolio-section">
          <h3>Portfólio</h3>
          <div class="form-field">
            <label>Tipo de Portfólio:</label>
            <select formControlName="portfolioType">
              <option value="pdf">PDF</option>
              <option value="website">Website</option>
            </select>
          </div>

          <div class="form-field" *ngIf="doctorForm.get('portfolioType')?.value === 'pdf'">
            <label for="portfolio">Upload PDF:</label>
            <input type="file" accept=".pdf" (change)="onFileSelected($event)">
          </div>

          <div class="form-field" *ngIf="doctorForm.get('portfolioType')?.value === 'website'">
            <label for="websiteUrl">URL do Website:</label>
            <input id="websiteUrl" type="url" formControlName="portfolioValue">
          </div>
        </div>

        <button type="submit" class="submit-button" [disabled]="!doctorForm.valid">
          Salvar Configurações
        </button>
      </form>
    </div>
  `,
  styles: [`
    .doctor-form {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .form-field {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .exams-section, .portfolio-section {
      border: 1px solid #ddd;
      padding: 15px;
      border-radius: 8px;
    }
    .add-button {
      background-color: #4CAF50;
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 10px;
    }
    .remove-button {
      background-color: #f44336;
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
    .submit-button {
      background-color: #2196F3;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    .submit-button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    input, select, textarea {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `]
})
export class DoctorFormComponent {
  doctorForm = this.fb.group({
    name: ['', Validators.required],
    specialty: ['', Validators.required],
    exams: this.fb.array([]),
    portfolioType: ['pdf', Validators.required],
    portfolioValue: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  get exams() {
    return this.doctorForm.get('exams') as FormArray;
  }

  addExam() {
    const examForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });

    this.exams.push(examForm);
  }

  removeExam(index: number) {
    this.exams.removeAt(index);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Aqui você pode implementar a lógica para upload do arquivo
      // Por exemplo, converter para base64 ou enviar para um servidor
      const reader = new FileReader();
      reader.onload = () => {
        this.doctorForm.patchValue({
          portfolioValue: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      const formData: DoctorForm = {
        name: this.doctorForm.get('name')?.value || '',
        specialty: this.doctorForm.get('specialty')?.value || '',
        exams: this.exams.value,
        portfolio: {
          type: this.doctorForm.get('portfolioType')?.value as 'pdf' | 'website',
          value: this.doctorForm.get('portfolioValue')?.value || ''
        }
      };

      console.log('Dados do formulário:', formData);
      // Aqui você pode implementar a lógica para enviar os dados para um servidor
    }
  }
}