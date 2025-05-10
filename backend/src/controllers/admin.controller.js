const { R2XX, R4XX } = require("../Responses");
const { adminService } = require("../services");
const { catchAsync } = require("../utils");

const adminController = {
  adminDashboard: catchAsync(async (req, res) => {
    const data = await adminService.getDashboardInsights();
    R2XX(res, "Admin dashboard data", 200, { data });
  }),

  getInstructors: catchAsync(async (req, res) => {
    const instructors = await adminService.getInstructors();
    R2XX(res, "Fetched instructors", 200, { data: instructors });
  }),

  getStudents: catchAsync(async (req, res) => {
    const students = await adminService.getStudents();
    R2XX(res, "Fetched students", 200, { data: students });
  }),

  getPayments: catchAsync(async (req, res) => {
    const payments = await adminService.getPayments();
    R2XX(res, "Fetched payments", 200, { data: payments });
  }),
};

module.exports = adminController;
