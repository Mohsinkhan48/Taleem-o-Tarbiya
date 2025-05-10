export interface CourseRatingInfo {
  courseId: string;
  title: string;
  avgRating: number | null;
}

export interface TeacherDashboardResponse {
  totalCourses: number;
  totalEnrollments: number;
  enrollmentsLast30Days: number;
  totalLectures: number;
  lecturesLast30Days: number;
  totalLearningHours: number;
  learningHoursLast30Days: number;
  lecturesTaken: number;
  lecturesTakenLast30Days: number;
  averageRatings: CourseRatingInfo[];
}
