import { SERVER_URL } from "../constants/env.constants";
import apiClient from "../api/apiClient";

export const CourseService = {
  getAllCourses: (filters = {}) =>
    apiClient.get(`${SERVER_URL}course/`, { params: filters }),
  getInstructorCourses: () =>
    apiClient.get(`${SERVER_URL}course/instructor/courses`),
  getCourseById: (courseId: string) =>
    apiClient.get(`${SERVER_URL}course/${courseId}`),
  getInstructorCourseById: (courseId: string) =>
    apiClient.get(`${SERVER_URL}course/instructor/courses/${courseId}`),
  getStudentEnrolledCourse: (courseId: string) =>
    apiClient.get(`${SERVER_URL}course/student/courses/${courseId}`),
  createCourse: (courseData: object) => {
    return apiClient.post(`${SERVER_URL}course/create`, courseData);
  },
  updateCourse: (courseData: object) => {
    return apiClient.put(`${SERVER_URL}course/update`, courseData);
  },
  addChapterToModule: (moduleId: string, chapter: object) => {
    return apiClient.put(`${SERVER_URL}course/addChapterToModule`, {
      moduleId,
      chapter,
    });
  },
  uploadCourseThumbnail: (courseId: string, file: File) => {
    const formData = new FormData();
    formData.append("thumbnail", file);

    return apiClient.post(
      `${SERVER_URL}course/upload-thumbnail/${courseId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  uploadLectureVideo: (
    courseId: string,
    moduleId: string,
    chapterId: string,
    title: string,
    description: string,
    file: File
  ) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", file);

    return apiClient.post(
      `${SERVER_URL}course/upload-lecture/${courseId}/${moduleId}/${chapterId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  submitQuiz: (
    courseId: string,
    moduleId: string,
    chapterId: string,
    quizId: string,
    answers: string[]
  ) => {
    return apiClient.post(
      `${SERVER_URL}progress/quiz/${courseId}/${moduleId}/${chapterId}/${quizId}`,
      { answers }
    );
  },
  getQuizProgress: (
    courseId: string,
    moduleId: string,
    chapterId: string,
    quizId: string,
  ) => {
    return apiClient.get(
      `${SERVER_URL}progress/quiz-progress/${courseId}/${moduleId}/${chapterId}/${quizId}`
    );
  },
};
