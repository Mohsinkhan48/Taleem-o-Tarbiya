import {
  FaUsers,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBookOpen,
  FaMoneyBillWave,
  FaShoppingCart,
  FaChartLine,
  FaTags,
} from "react-icons/fa";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAdminDashboard } from "../../../redux/slices/fetch/fetchSlices";
import { Loader } from "../../../assets/Loader";

const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector(
    (state: RootState) => state.adminDashboard
  );

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  if (loading || !data)
    return (
      <div className="flex justify-center items-center h-40 text-text">
        <Loader className="text-text" size={30} />
      </div>
    );

  const { users, courses, payments, enrollments, metadata } = data;

  return (
    <div className="p-6 bg-background text-text">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-card-border rounded-lg p-4 flex items-center space-x-4">
          <FaUsers className="text-3xl text-primary" />
          <div>
            <p className="text-sm text-secondary">Total Users</p>
            <p className="text-xl font-semibold">{users.total}</p>
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-lg p-4 flex items-center space-x-4">
          <FaChalkboardTeacher className="text-3xl text-primary" />
          <div>
            <p className="text-sm text-secondary">Instructors</p>
            <p className="text-xl font-semibold">{users.instructors}</p>
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-lg p-4 flex items-center space-x-4">
          <FaUserGraduate className="text-3xl text-primary" />
          <div>
            <p className="text-sm text-secondary">Students</p>
            <p className="text-xl font-semibold">{users.students}</p>
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-lg p-4 flex items-center space-x-4">
          <FaBookOpen className="text-3xl text-primary" />
          <div>
            <p className="text-sm text-secondary">Total Courses</p>
            <p className="text-xl font-semibold">{courses.total}</p>
          </div>
        </div>
      </div>

      {/* Payments & Enrollments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-card-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <FaMoneyBillWave className="text-primary" />
            <span>Payments</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-secondary">Total Orders</p>
              <p className="text-lg font-semibold">{payments.totalOrders}</p>
            </div>
            <div>
              <p className="text-sm text-secondary">Total Revenue</p>
              <p className="text-lg font-semibold">${payments.totalRevenue}</p>
            </div>
            <div>
              <p className="text-sm text-secondary">Paid</p>
              <p className="text-lg font-semibold">{payments.paid}</p>
            </div>
            <div>
              <p className="text-sm text-secondary">Pending</p>
              <p className="text-lg font-semibold">{payments.pending}</p>
            </div>
            <div>
              <p className="text-sm text-secondary">Failed</p>
              <p className="text-lg font-semibold">{payments.failed}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <FaChartLine className="text-primary" />
            <span>Enrollments</span>
          </h2>
          <div>
            <p className="text-sm text-secondary">Total Enrollments</p>
            <p className="text-lg font-semibold mb-4">{enrollments.total}</p>
            <p className="text-sm text-secondary mb-2">Top Courses</p>
            <ul className="list-disc list-inside">
              {enrollments.topCourses.map((course, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center pb-1 mb-1"
                >
                  <span className="font-medium text-text">{course.title}</span>
                  <span className="text-sm text-secondary">
                    {course.count} enrollments
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recent Signups & Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-card-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <FaUserGraduate className="text-primary" />
            <span>Recent Signups</span>
          </h2>
          <ul>
            {users.recentSignups.map((user, index) => (
              <li key={index} className="mb-2">
                <p className="font-semibold">{user.fullName}</p>
                <p className="text-sm text-secondary">{user.email}</p>
                <p className="text-sm text-secondary">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card border border-card-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <FaShoppingCart className="text-primary" />
            <span>Recent Orders</span>
          </h2>
          <ul>
            {payments.recentOrders.map((order, index) => (
              <li key={index} className="mb-4">
                <p className="font-semibold">{order.user.fullName}</p>
                <p className="text-sm text-secondary">{order.user.email}</p>
                <p className="text-sm text-secondary">
                  Ordered: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-secondary">
                  Courses:{" "}
                  {order.courses.map((course) => course.title).join(", ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Metadata */}
      <div className="bg-card border border-card-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <FaTags className="text-primary" />
          <span>Metadata</span>
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-secondary">Total Categories</p>
            <p className="text-lg font-semibold">{metadata.totalCategories}</p>
          </div>
          <div>
            <p className="text-sm text-secondary">Total Tags</p>
            <p className="text-lg font-semibold">{metadata.totalTags}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
