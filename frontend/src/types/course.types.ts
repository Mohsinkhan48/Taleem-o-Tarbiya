export interface Course {
  image: string;
  title: string;
  description: string;
  content: string;
  duration: string;
  price: number;
  level: string;
  category: string;
  isPaid: boolean;
  modules: Module[];
}

export interface Module {
  title: string;
  chapters: Chapter[];
}

export interface Chapter {
  title: string;
  content: string;
  videoUrl: string;
  isPreview: boolean;
  resources?: Resource[];
  quiz?: Quiz;
  assignment?: Assignment;
}

export interface Resource {
  name: string;
  url: string;
}

export interface Quiz {
  title: string;
  questions: Question[];
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Assignment {
  title: string;
  description: string;
  dueDate: string;
  submissionType: string;
}
