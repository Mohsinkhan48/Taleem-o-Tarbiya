import { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiClient from "../../../api/apiClient";
import { SERVER_URL } from "../../../constants/env.constants";
import { Course } from "../../../types/course.types";
import { Loader } from "../../../assets/Loader";
import CourseCard from "../../Course/CourseCard";
import { User } from "../../../types/auth.types";

interface TeacherPublicProfileResponse {
  teacher: User;
  courses: Course[];
}

const TeacherPublicProfile = () => {
  const { id: teacherId } = useParams<{ id: string }>();
  const [data, setData] = useState<TeacherPublicProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.post(
          `${SERVER_URL}course/teacher/public-profile`,
          { teacherId }
        );
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching teacher profile", err);
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchProfile();
    }
  }, [teacherId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader className="text-text" size={30} />
      </div>
    );

  if (!data)
    return (
      <div className="text-center text-gray-600 mt-10">No data found.</div>
    );

  const { teacher, courses } = data;

  return (
    <div className="p-6 text-text max-w-7xl mx-auto">
      {/* Teacher Info */}
      <div className="bg-card border border-card-border text-text shadow-md rounded-xl p-6 mb-8">
        <h2 className="text-3xl font-bold mb-4">{teacher.fullName}</h2>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Email:</span> {teacher.email}
          </p>
          <p>
            <span className="font-semibold">University:</span>{" "}
            {teacher.university || "N/A"}
          </p>
        </div>
      </div>

      {/* Courses */}
      <h3 className="text-2xl font-semibold mb-4">Courses by {teacher.fullName}</h3>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No courses available.</p>
      )}
    </div>
  );
};

export default TeacherPublicProfile;
