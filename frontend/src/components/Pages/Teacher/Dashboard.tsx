import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { Loader } from "../../../assets/Loader";
import { fetchTeacherDashboard } from "../../../redux/slices/fetch/fetchSlices";
import Card from "../../Reusable/Card";

const TeacherDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: dashboard, loading } = useSelector(
    (state: RootState) => state.teacherDashboard
  );

  useEffect(() => {
    dispatch(fetchTeacherDashboard());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <Loader size={40} />
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="text-text text-center mt-10">No Dashboard Data Found</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 text-text">
      <h1 className="text-2xl font-semibold mb-6">Teacher Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          label="Total Courses"
          value={dashboard.totalCourses}
        />
        <DashboardCard
          label="Total Enrollments"
          value={dashboard.totalEnrollments}
          last30DaysValue={dashboard.enrollmentsLast30Days}
        />
        <DashboardCard
          label="Total Lectures"
          value={dashboard.totalLectures}
          last30DaysValue={dashboard.lecturesLast30Days}
        />
        <DashboardCard
          label="Learning Hours"
          value={dashboard.totalLearningHours}
          last30DaysValue={dashboard.learningHoursLast30Days}
        />
        <DashboardCard
          label="Lectures Taken"
          value={dashboard.lecturesTaken}
          last30DaysValue={dashboard.lecturesTakenLast30Days}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Course Ratings</h2>
        <div className="space-y-3">
          {dashboard.averageRatings.map((rating) => (
            <Card
              key={rating.courseId}
              className="rounded-md p-3"
            >
              <h3 className="text-lg font-medium">{rating.title}</h3>
              <p className="text-sm text-secondary">
                Avg Rating:{" "}
                {rating.avgRating !== null
                  ? rating.avgRating.toFixed(1)
                  : "N/A"}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{
  label: string;
  value: number;
  last30DaysValue?: number;
}> = ({ label, value, last30DaysValue }) => (
  <Card className=" p-4 rounded-md shadow-sm">
    <div className="text-sm text-text mb-1">{label}</div>
    <div className="text-xl font-bold text-text mb-4">{value}</div>
    {last30DaysValue && (
      <div>
        <div className="text-sm font-bold text-success">+ {last30DaysValue}</div>
        <div className="text-sm text-secondary">in the past 30 days</div>
      </div>
    )}
  </Card>
);

export default TeacherDashboard;
