"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    description: "",
    duration: "",
    price: "",
    level: "Beginner",
    category: "",
    instructor: "",
    modules: [
      {
        title: "",
        chapters: [
          {
            title: "",
            content: "",
            video: "",
            quiz: {
              title: "",
              questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }]
            },
            assignment: {
              title: "",
              description: "",
              dueDate: ""
            }
          }
        ]
      }
    ],    
    image: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) setFormData(prev => ({ ...prev, instructor: user.id }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" ? Math.max(1, Number(value)) : value,
    }));
  };

  const handleFileChange = (e) => setFormData(prev => ({ ...prev, image: e.target.files[0] }));

  const handleModuleChange = (index, e) => {
    const updated = [...formData.modules];
    updated[index][e.target.name] = e.target.value;
    setFormData(prev => ({ ...prev, modules: updated }));
  };

  const handleChapterChange = (modIdx, chapIdx, e) => {
    const updated = [...formData.modules];
    updated[modIdx].chapters[chapIdx][e.target.name] = e.target.value;
    setFormData(prev => ({ ...prev, modules: updated }));
  };

  // const handleAssignmentChange = (i, e) => {
  //   const updated = [...formData.assignment];
  //   updated[i][e.target.name] = e.target.value;
  //   setFormData(prev => ({ ...prev, assignment: updated }));
  // };

  const handleQuizTitleChange = (modIdx, chapIdx, e) => {
    const updated = [...formData.modules];
    updated[modIdx].chapters[chapIdx].quiz.title = e.target.value;
    setFormData({ ...formData, modules: updated });
  };
  
  const handleQuizQuestionChange = (modIdx, chapIdx, quesIdx, e) => {
    const updated = [...formData.modules];
    updated[modIdx].chapters[chapIdx].quiz.questions[quesIdx].question = e.target.value;
    setFormData({ ...formData, modules: updated });
  };
  
  const handleQuizOptionChange = (modIdx, chapIdx, quesIdx, optIdx, e) => {
    const updated = [...formData.modules];
    updated[modIdx].chapters[chapIdx].quiz.questions[quesIdx].options[optIdx] = e.target.value;
    setFormData({ ...formData, modules: updated });
  };
  
  const handleQuizCorrectAnswerChange = (modIdx, chapIdx, quesIdx, e) => {
    const updated = [...formData.modules];
    updated[modIdx].chapters[chapIdx].quiz.questions[quesIdx].correctAnswer = e.target.value;
    setFormData({ ...formData, modules: updated });
  };
  
  const handleAssignmentChange = (modIdx, chapIdx, e) => {
    const updated = [...formData.modules];
    updated[modIdx].chapters[chapIdx].assignment[e.target.name] = e.target.value;
    setFormData({ ...formData, modules: updated });
  };
  

  const addModule = () => setFormData(prev => ({
    ...prev,
    modules: [...prev.modules, { title: "", chapters: [{ title: "", content: "", video: "" }] }]
  }));

  const addChapter = (moduleIndex) => {
    const updated = [...formData.modules];
    updated[moduleIndex].chapters.push({
      title: "",
      content: "",
      video: "",
      quiz: {
        title: "",
        questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }]
      },
      assignment: {
        title: "",
        description: "",
        dueDate: ""
      }
    });
    setFormData(prev => ({ ...prev, modules: updated }));
  };
  

  const addAssignment = () => setFormData(prev => ({
    ...prev,
    assignment: [...prev.assignment, { title: "", description: "", dueDate: "" }]
  }));

  const addQuiz = () => setFormData(prev => ({
    ...prev,
    quiz: [...prev.quiz, { title: "", questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }] }]
  }));

  const addQuestion = (i) => {
    const updated = [...formData.quiz];
    updated[i].questions.push({ question: "", options: ["", "", "", ""], correctAnswer: "" });
    setFormData(prev => ({ ...prev, quiz: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(formData.price) || formData.price <= 0) return alert("Enter valid price");

    try {
      const submission = new FormData();
      for (let key in formData) {
        if (key === "image") submission.append("image", formData[key]);
        else if (Array.isArray(formData[key]) || typeof formData[key] === "object") submission.append(key, JSON.stringify(formData[key]));
        else submission.append(key, formData[key]);
      }
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/courses", submission, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      alert("Course created!");
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg my-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Create a New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["title", "content", "description", "duration", "price", "category", "instructor"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          ))}
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <input type="file" onChange={handleFileChange} className="w-full p-3 border rounded-lg" />
        </div>

        <Section title="Modules" onAdd={addModule}>
  {formData.modules.map((module, i) => (
    <div key={i} className="space-y-4 border border-gray-200 p-4 rounded-lg">
      <input
        name="title"
        value={module.title}
        onChange={(e) => handleModuleChange(i, e)}
        placeholder="Module Title"
        className="w-full p-2 border rounded"
      />
      
      {module.chapters.map((chap, j) => (
        <div key={j} className="pl-4 space-y-4 border border-gray-100 p-4 rounded bg-gray-50">
          {/* Chapter Fields */}
          {["title", "content", "video"].map((field) => (
            <input
              key={field}
              name={field}
              value={chap[field]}
              onChange={(e) => handleChapterChange(i, j, e)}
              placeholder={`Chapter ${field}`}
              className="w-full p-2 border rounded"
            />
          ))}

          {/* Assignment Section */}
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-600">Assignment</h4>
            <input
              name="title"
              value={chap.assignment?.title || ""}
              onChange={(e) => handleAssignmentChange(i, j, e)}
              placeholder="Assignment Title"
              className="w-full p-2 border rounded"
            />
            <input
              name="description"
              value={chap.assignment?.description || ""}
              onChange={(e) => handleAssignmentChange(i, j, e)}
              placeholder="Assignment Description"
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              name="dueDate"
              value={chap.assignment?.dueDate || ""}
              onChange={(e) => handleAssignmentChange(i, j, e)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Quiz Section */}
          <div className="space-y-2">
            <h4 className="font-semibold text-green-600">Quiz</h4>
            <input
              name="quizTitle"
              value={chap.quiz?.title || ""}
              onChange={(e) => handleQuizTitleChange(i, j, e)}
              placeholder="Quiz Title"
              className="w-full p-2 border rounded"
            />

            {chap.quiz?.questions.map((ques, qIdx) => (
              <div key={qIdx} className="pl-4 space-y-1 border-l-2 border-green-300">
                <input
                  name="question"
                  value={ques.question}
                  onChange={(e) => handleQuizQuestionChange(i, j, qIdx, e)}
                  placeholder="Question"
                  className="w-full p-2 border rounded"
                />
                {ques.options.map((opt, oIdx) => (
                  <input
                    key={oIdx}
                    value={opt}
                    onChange={(e) => handleQuizOptionChange(i, j, qIdx, oIdx, e)}
                    placeholder={`Option ${oIdx + 1}`}
                    className="w-full p-2 border rounded"
                  />
                ))}
                <input
                  name="correctAnswer"
                  value={ques.correctAnswer}
                  onChange={(e) => handleQuizCorrectAnswerChange(i, j, qIdx, e)}
                  placeholder="Correct Answer"
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const updated = [...formData.modules];
                updated[i].chapters[j].quiz.questions.push({
                  question: "",
                  options: ["", "", "", ""],
                  correctAnswer: "",
                });
                setFormData({ ...formData, modules: updated });
              }}
              className="text-sm text-blue-600 hover:underline mt-2"
            >
              + Add Question
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => addChapter(i)}
        className="text-sm text-blue-600 hover:underline mt-2"
      >
        + Add Chapter
      </button>
    </div>
  ))}
</Section>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all">Create Course</button>
      </form>
    </motion.div>
  );
};

const Section = ({ title, children, onAdd }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
      <button type="button" onClick={onAdd} className="text-blue-600 hover:underline">+ Add {title}</button>
    </div>
    {children}
  </div>
);

export default CreateCourse;
