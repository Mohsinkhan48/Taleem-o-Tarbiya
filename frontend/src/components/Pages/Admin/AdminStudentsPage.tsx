import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchAdminStudents } from "../../../redux/slices/fetch/fetchSlices";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { Column, Table } from "../../Reusable/Table";
import { User } from "../../../types/auth.types";

const AdminStudentsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {data:students, loading} = useSelector((state: RootState) => state.adminStudents);

  useEffect(() => {
    dispatch(fetchAdminStudents());
  }, [dispatch]);

  const columns: Column<User>[] = [
    { label: "Name", accessor: "fullName" },
    { label: "Email", accessor: "email" },
    {
      label: "Email Verified",
      accessor: "isEmailVerified",
      render: (user) =>
        user.isEmailVerified ? (
          <div className="flex items-center gap-1 text-success">
            <MdCheckCircle className="text-xl" />
            <span>Verified</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-error">
            <MdCancel className="text-xl" />
            <span>Unverified</span>
          </div>
        ),
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-primary">Students</h2>
      <Table data={students!} columns={columns} loading={loading}/>
    </div>
  );
};

export default AdminStudentsPage;
