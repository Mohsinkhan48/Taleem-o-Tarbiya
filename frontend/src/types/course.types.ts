import {
  CourseCategory,
  CourseLevel,
  CourseTag,
} from "../redux/slices/fetch/fetchSlices";
import { User } from "./auth.types";

export interface Course {
  _id: string;
  image: string;
  previewUrl?: string;
  title: string;
  description: string;
  content: string;
  instructor: User;
  duration: string;
  price: number;
  level: CourseLevel;
  category: CourseCategory;
  tags: CourseTag[];
  isPaid: boolean;
  isPublished: boolean;
  modules: Module[];
  ratings: number[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Module {
  _id?: string;
  title: string;
  chapters: Chapter[];
}

export interface Chapter {
  _id?: string;
  title: string;
  content: string;
  lecture?: Lecture;
  isPreview: boolean;
  resources?: Resource[];
  quiz?: Quiz;
  assignment?: Assignment;
  progress?: LectureProgress;
}
export interface Lecture {
  _id?: string;
  title?: string;
  description?: string;
  chapter: string;
  videoUrl: string;
  duration?: number;
  resolution?: string;
  size?: number;
  format?: string;
  hasVideo?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface LectureProgress {
  _id: string;
  user: string;
  lecture: string;
  chapter: string;
  course: string;
  module: string;
  currentTime: number;
  completed: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Resource {
  _id?: string;
  name: string;
  url: string;
}

export interface Quiz {
  _id?: string;
  title: string;
  questions: Question[];
}

export interface Question {
  _id?: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Assignment {
  _id?: string;
  title: string;
  description: string;
}

export interface Order {
  _id: string;
  user: User;
  course: Course;
  stripeSessionId: string;
  paymentIntentId?: string;
  status: "pending" | "paid" | "failed";
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
}
