import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Button from "../../Reusable/Button";
import Input from "../../Reusable/Input";
import apiClient from "../../../api/apiClient";
import { SERVER_URL } from "../../../constants/env.constants";

const TeacherProfile: React.FC = () => {
  const { user } = useAuth();

  const [university, setUniversity] = useState(user?.university || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleUniversityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUniversity(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!university.trim()) {
      setError("University name is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // Replace this URL with your actual backend API endpoint
      const response = await apiClient.post(
        `${SERVER_URL}teacher/update-university`,
        {
          teacherId: user?._id,
          university,
        }
      );
      if (response.data.success) {
        setMessage("University Updated Successfully!");
        localStorage.setItem("user", JSON.stringify(response.data.teacher))
      } else {
        setError(response.data.reason);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl shadow-lg bg-card text-text">
      <h2 className="text-2xl font-bold mb-4">Teacher Profile</h2>

      <div className="mb-4">
        <p>
          <strong>Name:</strong> {user?.fullName}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Email Verified:</strong>{" "}
          {user?.isEmailVerified ? "Yes" : "No"}
        </p>
        <p>
          <strong>Role:</strong> {user?.role?.name || "N/A"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="University Name"
          placeholder="e.g., MIT, Stanford University"
          onChange={handleUniversityChange}
          value={university}
          id="university"
          type="text"
          error={error}
        />

        <Button type="submit" isLoading={isSubmitting} variant="primary">
          Update University
        </Button>
      </form>
      <span className="text-success">{message}</span>
    </div>
  );
};

export default TeacherProfile;
