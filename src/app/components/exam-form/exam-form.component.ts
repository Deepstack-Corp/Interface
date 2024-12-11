import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Exam } from '../../models/exam.model';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="exam-form">
      <h3>Exame</h3>
      <form [formGroup]="examForm" class="form-container">
        <div class="form-field">
          <label for="name">Nome do Exame:</label>
          <input id="name" type="text" formControlName="name">
        </div>

        <div class="form-field">
          <label for="description">Descrição:</label>
          <textarea id="description" formControlName="description"></textarea>
        </div>

        <div class="form-field">
          <label for="price">Valor (R$):</label>
          <input id="price" type="number" formControlName="price">
        </div>
      </form>
    </div>
  `,
  styles: [`
    .exam-form {
      border: 1px solid #ddd;
      padding: 15px;
      margin: 10px 0;
      border-radius: 8px;
    }
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .form-field {
      display: flex;
      flex-direction: column;
    }
    input, textarea {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `]
})
export class ExamFormComponent {
  examForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.examForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  getExamData(): Exam {
    return this.examForm.value;
  }
}