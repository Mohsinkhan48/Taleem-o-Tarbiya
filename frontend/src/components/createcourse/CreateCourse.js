import React, { useState, useEffect } from "react";

const CreateCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    content: "",
    duration: "",
    price: "",
    chapters: "",
    ratings: "0",
    instructor: "", 
    level: "",
    students: "0",
    category: "",
  });

  const [image, setImage] = useState(null); 
  const [instructorId, setInstructorId] = useState(""); 

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log("Parsed User Data:", parsedUser);
        if (parsedUser.id) {
          setInstructorId(parsedUser.id);
        } else {
          console.log("User ID is missing from the stored data");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      console.log("No user data found in localStorage");
    }
  }, []);
  
  console.log("Token:", localStorage.getItem("token"));
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!instructorId) {
      alert("Instructor ID not found. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    Object.keys(course).forEach((key) => {
      formData.append(key, course[key] || "N/A");
    });

    // Append the correct instructor ID
    formData.append("instructor", instructorId);

    try {
      const response = await fetch("http://localhost:8080/api/courses", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        alert("Course added successfully!");
        setCourse({
          title: "",
          content: "",
          duration: "",
          price: "",
          chapters: "",
          ratings: "0",
          instructor: instructorId, // Keep instructor ID
          level: "",
          students: "0",
          category: "",
        });
        setImage(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Create a New Course
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={course.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* File Input for Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            name="content"
            placeholder="Course Description"
            value={course.content}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g., 4 weeks)"
              value={course.duration}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price ($)"
              value={course.price}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="chapters"
              placeholder="Number of Chapters"
              value={course.chapters}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="level"
              placeholder="Level (Beginner, Intermediate, Advanced)"
              value={course.level}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <input
            type="text"
            name="category"
            placeholder="Category (e.g., Programming)"
            value={course.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
