// src/store/slices/courseMetaSlice.ts
import { AdminDashboardResponse } from "../../../types/admin.types";
import { User } from "../../../types/auth.types";
import { Order } from "../../../types/course.types";
import { StudentCourse } from "../../../types/student.types";
import { TeacherDashboardResponse } from "../../../types/teacher.types";
import { createGenericSlice, createGenericThunk } from "./fetchGenericSlice";

// ==================
// Type Declarations
// ==================

export interface CourseCategory {
  _id: string;
  name: string;
  description: string;
}

export interface CourseTag {
  _id: string;
  name: string;
}

export interface CourseLevel {
  _id: string;
  name: string;
  description: string;
}

export interface Role {
  _id: string;
  name: string;
  description: string;
}

// ==================
// Thunks
// ==================

export const fetchCourseCategories = createGenericThunk<CourseCategory[]>(
  "courseCategories",
  "/static/course-categories"
);

export const fetchCourseTags = createGenericThunk<CourseTag[]>(
  "courseTags",
  "/static/course-tags"
);

export const fetchCourseLevels = createGenericThunk<CourseLevel[]>(
  "courseLevels",
  "/static/course-levels"
);

export const fetchAllRoles = createGenericThunk<Role[]>(
  "roles",
  "/static/roles"
);

export const fetchStudentCourses = createGenericThunk<StudentCourse[]>(
  "student-courses",
  "/course/student/courses"
);

export const fetchTeacherDashboard = createGenericThunk<TeacherDashboardResponse>(
  "teacherDashboard",
  "course/teacher/dashboard"
);

export const fetchAdminInstructors = createGenericThunk<User[]>(
  "adminInstructors",
  "admin/instructors"
);

export const fetchAdminStudents = createGenericThunk<User[]>(
  "adminStudents",
  "admin/students"
);

export const fetchPayments = createGenericThunk<Order[]>(
  "adminPayments",
  "admin/payments"
);
export const fetchAdminDashboard = createGenericThunk<AdminDashboardResponse>(
  "adminDashboard",
  "admin/dashboard"
);

// ==================
// Slices
// ==================

export const {
  reducer: courseCategoryReducer,
  actions: courseCategoryActions,
} = createGenericSlice<CourseCategory[]>("courseCategories", fetchCourseCategories);

export const {
  reducer: courseTagReducer,
  actions: courseTagActions,
} = createGenericSlice<CourseTag[]>("courseTags", fetchCourseTags);

export const {
  reducer: courseLevelReducer,
  actions: courseLevelActions,
} = createGenericSlice<CourseLevel[]>("courseLevels", fetchCourseLevels);

export const {
  reducer: roleReducer,
  actions: roleActions,
} = createGenericSlice<Role[]>("roles", fetchAllRoles);

export const {
  reducer: studentCoursesReducer,
  actions: studentCoursesActions,
} = createGenericSlice<StudentCourse[]>("student-courses", fetchStudentCourses);

export const {
  reducer: teacherDashboardReducer,
  actions: teacherDashboardActions,
} = createGenericSlice<TeacherDashboardResponse>("teacherDashboard", fetchTeacherDashboard);

export const {
  reducer: adminInstructorsReducer,
  actions: adminInstructorsActions,
} = createGenericSlice<User[]>("adminInstructors", fetchAdminInstructors);

export const {
  reducer: adminStudentsReducer,
  actions: adminStudentsActions,
} = createGenericSlice<User[]>("adminStudents", fetchAdminStudents);

export const {
  reducer: adminPaymentsReducer,
  actions: adminPaymentsActions,
} = createGenericSlice<Order[]>("adminPayments", fetchPayments);

export const {
  reducer: adminDashboardReducer,
  actions: adminDashboardActions,
} = createGenericSlice<AdminDashboardResponse>("adminDashboard", fetchAdminDashboard);
