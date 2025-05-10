import { Course } from "./course.types";

export interface StudentCourse extends Course {
    progress: number;
}