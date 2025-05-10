import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchAdminInstructors } from "../../../redux/slices/fetch/fetchSlices";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { User } from "../../../types/auth.types";
import { Column, Table } from "../../Reusable/Table";

const AdminInstructorsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {data: instructors, loading} = useSelector((state: RootState) => state.adminInstructors);

  useEffect(() => {
    dispatch(fetchAdminInstructors());
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
      <h2 className="text-2xl font-bold text-primary">Instructors</h2>
      <Table data={instructors!} columns={columns} loading={loading}/>
    </div>
  );
};

export default AdminInstructorsPage;
