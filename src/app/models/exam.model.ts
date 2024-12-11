export interface Exam {
  name: string;
  description: string;
  price: number;
}

export interface DoctorForm {
  name: string;
  specialty: string;
  exams: Exam[];
  portfolio: {
    type: 'pdf' | 'website';
    value: string;
  };
}