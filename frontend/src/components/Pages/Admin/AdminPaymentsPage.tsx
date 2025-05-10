import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayments } from "../../../redux/slices/fetch/fetchSlices";
import { MdAccessTime, MdCancel, MdCheckCircle } from "react-icons/md";
import { Column, Table } from "../../Reusable/Table";
import { Order } from "../../../types/course.types";

const AdminPaymentsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {data:payments, loading} = useSelector((state: RootState) => state.adminPayments);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);
  const columns: Column<Order>[] = [
    { label: "User", accessor: "user.fullName", render: (order) => order.user.fullName },
    { label: "Email", accessor: "user.email", render: (order) => order.user.email },
    {
      label: "Courses",
      accessor: "courses",
      render: (order) => {
        return order.courses.length > 0 ? order.courses.map((c) => c.title).join(", ") : "No courses"
      },
    },
    {
      label: "Status",
      accessor: "status",
      render: (order) => {
        switch (order.status) {
          case "paid":
            return (
              <div className="flex items-center gap-1 text-success">
                <MdCheckCircle className="text-xl" />
                <span className="text-sm font-medium">Paid</span>
              </div>
            );
          case "pending":
            return (
              <div className="flex items-center gap-1 text-warning">
                <MdAccessTime className="text-xl" />
                <span className="text-sm font-medium">Pending</span>
              </div>
            );
          case "failed":
            return (
              <div className="flex items-center gap-1 text-error">
                <MdCancel className="text-xl" />
                <span className="text-sm font-medium">Failed</span>
              </div>
            );
        }
      },
    },
    {
      label: "Date",
      accessor: "createdAt",
      render: (order) =>
        new Date(order.createdAt).toLocaleDateString(),
    },
  ];
  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold text-primary">Payments</h2>
      <Table data={payments!} columns={columns} loading={loading} />
    </div>
  );
};

export default AdminPaymentsPage;
