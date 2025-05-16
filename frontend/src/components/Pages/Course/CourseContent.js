import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllCourses } from '../../../redux/slices/CourseSlice';

// Relevant imports remain the same

const CourseContent = ({ courseId }) => {
  const { allCourses, loading, error } = useSelector((state) => state.courses);

  const [activeModule, setActiveModule] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [viewType, setViewType] = useState('chapter'); // 'chapter', 'quiz', 'assignment'

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  const course = allCourses.find((c) => c._id === courseId);
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!course) return <p className="text-center mt-10">Course not found.</p>;

  const handleNext = () => {
    const module = course.modules[activeModule];
    if (viewType === 'chapter') {
      const nextChapter = activeChapter + 1;
      if (nextChapter < module.chapters.length) {
        setActiveChapter(nextChapter);
        return;
      }
      if (module.quiz?.questions?.length) {
        setViewType('quiz');
        return;
      }
      if (module.assignment) {
        setViewType('assignment');
        return;
      }
    } else if (viewType === 'quiz' && module.assignment) {
      setViewType('assignment');
      return;
    }
    const nextModule = activeModule + 1;
    if (course.modules[nextModule]) {
      setActiveModule(nextModule);
      setActiveChapter(0);
      setViewType('chapter');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">{course.title}</h2>
        {course.modules.map((mod, i) => (
          <div key={i} className="mb-4">
            <button
              onClick={() => {
                setActiveModule(i);
                setActiveChapter(null);
                setViewType(null);
              }}
              className={`w-full text-left font-bold py-2 px-3 rounded ${
                activeModule === i ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
              }`}
            >
              📦 {mod.title}
            </button>

            {/* Expand Chapters + Quiz + Assignment */}
            <AnimatePresence>
              {activeModule === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="ml-3 mt-2 space-y-1"
                >
                  {mod.chapters.map((ch, j) => (
                    <button
                      key={j}
                      onClick={() => {
                        setActiveChapter(j);
                        setViewType('chapter');
                      }}
                      className={`block w-full text-left text-sm px-3 py-1 rounded ${
                        activeChapter === j && viewType === 'chapter'
                          ? 'bg-indigo-200 font-semibold'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      📘 {ch.title}
                    </button>
                  ))}

                  {mod.quiz?.questions?.length > 0 && (
                    <button
                      onClick={() => {
                        setViewType('quiz');
                        setActiveChapter(null);
                      }}
                      className={`block text-sm text-left px-3 py-1 rounded ${
                        viewType === 'quiz' ? 'bg-green-200 font-semibold' : 'hover:bg-gray-100'
                      }`}
                    >
                      📋 Quiz
                    </button>
                  )}

                  {mod.assignment && (
                    <button
                      onClick={() => {
                        setViewType('assignment');
                        setActiveChapter(null);
                      }}
                      className={`block text-sm text-left px-3 py-1 rounded ${
                        viewType === 'assignment' ? 'bg-yellow-200 font-semibold' : 'hover:bg-gray-100'
                      }`}
                    >
                      📝 Assignment
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Content Display Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <AnimatePresence>
          {viewType === 'chapter' && activeModule !== null && activeChapter !== null && (
            <motion.div
              key={`chapter-${activeChapter}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <h2 className="text-2xl font-bold text-gray-800">
                {course.modules[activeModule].chapters[activeChapter].title}
              </h2>
              <p className="mt-4 text-gray-700 whitespace-pre-line">
                {course.modules[activeModule].chapters[activeChapter].content}
              </p>
              <button
                onClick={handleNext}
                className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Next
              </button>
            </motion.div>
          )}

          {viewType === 'quiz' && activeModule !== null && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h3 className="text-xl font-bold text-green-700 mb-4">📋 Quiz</h3>
              <ul className="space-y-4">
                {course.modules[activeModule].quiz.questions.map((q, idx) => (
                  <li key={idx} className="p-4 bg-white rounded shadow">
                    <p className="font-medium text-gray-800">{q.question}</p>
                    <ul className="mt-2 space-y-1">
                      {q.options.map((opt, i) => (
                        <li
                          key={i}
                          className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 cursor-pointer"
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleNext}
                className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Next
              </button>
            </motion.div>
          )}

          {viewType === 'assignment' && activeModule !== null && (
            <motion.div
              key="assignment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h3 className="text-xl font-bold text-yellow-700 mb-4">📝 Assignment</h3>
              <p className="text-gray-800">
                <strong>Title:</strong> {course.modules[activeModule].assignment.title}
              </p>
              <p className="text-gray-700 mt-2">{course.modules[activeModule].assignment.description}</p>
              <button
                onClick={handleNext}
                className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Next
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CourseContent;

