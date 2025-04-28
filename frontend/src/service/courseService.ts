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
  updateCourse: (courseData: object) => {
    return apiClient.put(`${SERVER_URL}course/update`, courseData);
  },
  uploadCourseThumbnail: (courseId: string, file: File) => {
    const formData = new FormData();
    formData.append("thumbnail", file);
  
    return apiClient.post(`${SERVER_URL}course/upload-thumbnail/${courseId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
