import { SERVER_URL } from "../constants/env.constants";
import apiClient from "../api/apiClient";

export const CourseService = {
  getAllCourses: (filters = {}) => apiClient.get(`${SERVER_URL}course/`, { params: filters }),
  getInstructorCourses: () => apiClient.get(`${SERVER_URL}course/instructor/courses`),
  getCourseById: (courseId: string) => apiClient.get(`${SERVER_URL}course/${courseId}`),
  getStudentEnrolledCourse: (courseId: string) => apiClient.get(`${SERVER_URL}course/student/courses/${courseId}`),
  createCourse: (courseData: object) => {
    return apiClient.post(`${SERVER_URL}course/create`, courseData);
  },
};
