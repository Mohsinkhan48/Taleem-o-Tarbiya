import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";

import Register from "./components/Pages/Auth/Register";
import Login from "./components/Pages/Auth/Login";
import LandingPage from "./components/Pages/Static/LandingPage";
import EmailVerification from "./components/Pages/Auth/EmailVerification";
import ForgotPassword from "./components/Pages/Auth/ForgotPassword";
import AboutUs from "./components/Pages/Static/AboutUs";
import ContactUs from "./components/Pages/Static/ContactUs";
import ExploreCourses from "./components/Pages/Course/ExploreCourse";

import ProtectedRoute from "./components/Pages/Auth/ProtectedRoute";
import TeacherDashboard from "./components/Pages/Teacher/Dashboard";
import StudentDashboard from "./components/Pages/Student/Dashboard";
import AdminDashboard from "./components/Pages/Admin/Dashboard";
import AdminLayout from "./components/Layout/Admin/AdminLayout";
import TeacherLayout from "./components/Layout/Teacher/TeacherLayout";
import StudentLayout from "./components/Layout/Student/StudentLayout";
import TeacherCourses from "./components/Pages/Teacher/TeacherCourses";
import CreateCourseForm from "./components/Pages/Teacher/CreateCourse/CreateCourseForm";
import PageNotFound from "./components/Pages/PageNotFound";
import Cart from "./components/Pages/Cart";
import CourseDetails from "./components/Pages/Course/CourseDetails";
import Success from "./components/Pages/Stripe/Success";
import Cancel from "./components/Pages/Stripe/Cancel";
import StudentCourses from "./components/Pages/Student/StudentCourses";
import CourseViewer from "./components/Pages/Student/CourseViewer/CourseViewer";
import EditCourse from "./components/Pages/Teacher/EditCourse/EditCourse";
import EditModule from "./components/Pages/Teacher/EditCourse/EditModule/EditModule";
import CourseUploadPage from "./components/Pages/Teacher/CreateCourse/LectureUploadTemporary";
import ManageLectures from "./components/Pages/Teacher/ManageLectures/ManageLectures";
import AdminPaymentsPage from "./components/Pages/Admin/AdminPaymentsPage";
import AdminInstructorsPage from "./components/Pages/Admin/AdminTeachersPage";
import AdminStudentsPage from "./components/Pages/Admin/AdminStudentsPage";
import StripeReauth from "./components/Pages/Teacher/StripeAccount/StripeReauth";
import StripeConnected from "./components/Pages/Teacher/StripeAccount/StripeConnected";
import StripeAccountManager from "./components/Pages/Teacher/StripeAccount/StripeAccountManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/explore-courses" element={<ExploreCourses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
        </Route>

        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="create-course/:id?" element={<CreateCourseForm />} />
          <Route path="edit-course/:id?" element={<CreateCourseForm />} />
          <Route path="courses/:id" element={<EditCourse />} />
          <Route path="courses/:id/modules" element={<EditModule />} />
          <Route path="courses" element={<TeacherCourses />} />
          <Route path="lecture-upload" element={<CourseUploadPage />} />
          <Route path="manage-lectures/:id" element={<ManageLectures />} />
          <Route path="stripe/reauth" element={<StripeReauth />} />
          <Route path="stripe/onboard" element={<StripeAccountManager />} />
          <Route path="stripe/connected" element={<StripeConnected />} />
        </Route>

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="courses/:id" element={<CourseViewer />} />
          <Route path="cart" element={<Cart />} />
          <Route path="payment/success" element={<Success />} />
          <Route path="payment/cancel" element={<Cancel />} />
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="teachers" element={<AdminInstructorsPage />} />
          <Route path="students" element={<AdminStudentsPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
