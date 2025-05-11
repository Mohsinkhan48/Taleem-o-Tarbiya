const { ROLES } = require("../constants");
const {
  Course,
  Role,
  User,
  Enrollment,
  Order,
  CourseTag,
  CourseCategory,
} = require("../models");

const adminService = {
  getInstructors: async () => {
    const instructorRole = await Role.findOne({ name: ROLES.TEACHER });
    if (!instructorRole) return [];

    const instructors = await User.find({ role: instructorRole._id })
      .select("-password -refreshTokens")
      .populate({
        path: "role",
        select: "name",
      });

    // Include courses taught
    const instructorData = await Promise.all(
      instructors.map(async (instructor) => {
        const courses = await Course.find({
          instructor: instructor._id,
        }).select("title price isPublished");
        return {
          ...instructor.toObject(),
          courses,
        };
      })
    );

    return instructorData;
  },

  getStudents: async () => {
    const studentRole = await Role.findOne({ name: ROLES.STUDENT });
    if (!studentRole) return [];

    const students = await User.find({ role: studentRole._id })
      .select("-password -refreshTokens")
      .populate({
        path: "role",
        select: "name",
      });

    const studentData = await Promise.all(
      students.map(async (student) => {
        const enrollments = await Enrollment.find({
          student: student._id,
        }).populate({
          path: "course",
          select: "title price",
        });
        return {
          ...student.toObject(),
          enrolledCourses: enrollments.map((e) => e.course),
        };
      })
    );

    return studentData;
  },

  getPayments: async () => {
    const orders = await Order.find({ status: "paid" })
      .populate("user", "fullName email")
      .populate("course", "title price")
      .select("-__v");

    return orders;
  },
  getDashboardInsights: async () => {
    const [instructorRole, studentRole, adminRole] = await Promise.all([
      Role.findOne({ name: ROLES.TEACHER }),
      Role.findOne({ name: ROLES.STUDENT }),
      Role.findOne({ name: ROLES.ADMIN }),
    ]);

    const [
      totalUsers,
      instructorsCount,
      studentsCount,
      totalCourses,
      publishedCourses,
      draftCourses,
      paidCourses,
      freeCourses,
      totalOrders,
      totalRevenueData,
      paidOrders,
      pendingOrders,
      failedOrders,
      totalEnrollments,
      enrollments,
      recentUsers,
      recentOrders,
      categoriesCount,
      tagsCount,
    ] = await Promise.all([
      User.countDocuments({ role: { $ne: adminRole } }),
      User.countDocuments({ role: instructorRole?._id }),
      User.countDocuments({ role: studentRole?._id }),
      Course.countDocuments(),
      Course.countDocuments({ isPublished: true }),
      Course.countDocuments({ isPublished: false }),
      Course.countDocuments({ isPaid: true }),
      Course.countDocuments({ isPaid: false }),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: "paid" } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalAmount" },
          },
        },
      ]),
      Order.countDocuments({ status: "paid" }),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: "failed" }),
      Enrollment.countDocuments(),
      Enrollment.find().populate("course"),
      User.find({ role: { $ne: adminRole } })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("fullName email createdAt"),
      Order.find({ status: "paid" })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("user", "fullName email")
        .populate("course", "title price"),
      CourseCategory.countDocuments(),
      CourseTag.countDocuments(),
    ]);

    // Calculate top enrolled courses
    const courseEnrollMap = {};
    enrollments.forEach((e) => {
      if (e.course && e.course.title) {
        const title = e.course.title;
        courseEnrollMap[title] = (courseEnrollMap[title] || 0) + 1;
      }
    });

    const topEnrolledCourses = Object.entries(courseEnrollMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([title, count]) => ({ title, count }));

    return {
      users: {
        total: totalUsers,
        instructors: instructorsCount,
        students: studentsCount,
        recentSignups: recentUsers,
      },
      courses: {
        total: totalCourses,
        published: publishedCourses,
        draft: draftCourses,
        paid: paidCourses,
        free: freeCourses,
      },
      payments: {
        totalOrders,
        totalRevenue: totalRevenueData[0]?.totalRevenue || 0,
        paid: paidOrders,
        pending: pendingOrders,
        failed: failedOrders,
        recentOrders,
      },
      enrollments: {
        total: totalEnrollments,
        topCourses: topEnrolledCourses,
      },
      metadata: {
        totalCategories: categoriesCount,
        totalTags: tagsCount,
      },
    };
  },
};

module.exports = adminService;
