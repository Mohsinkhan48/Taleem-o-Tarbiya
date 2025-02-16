import { useState } from "react";
import { motion } from "framer-motion";

const modules = [
  { id: 1, title: "Module 1", subheadings: [
      { id: 101, title: "What is Fasting?", type: "text", content: "Fasting in Islam is an act of worship where one abstains from food, drink, and other physical needs from dawn to sunset." },
      { id: 102, title: "Benefits of Fasting", type: "video", content: "https://www.youtube.com/embed/samplevideo1" }
    ]
  },
  { id: 2, title: "Module 2", subheadings: [
      { id: 201, title: "Who Must Fast?", type: "text", content: "Fasting is obligatory for every adult Muslim who is physically and mentally capable of doing so." },
      { id: 202, title: "What Breaks a Fast?", type: "video", content: "https://www.youtube.com/embed/samplevideo2" }
    ]
  },
  { id: 3, title: "Module 3", subheadings: [
      { id: 301, title: "What is Zakat?", type: "text", content: "Zakat is a form of almsgiving treated as a religious obligation in Islam." },
      { id: 302, title: "How to Calculate Zakat?", type: "video", content: "https://www.youtube.com/embed/samplevideo3" }
    ]
  },
  { id: 4, title: "Module 4", subheadings: [
      { id: 401, title: "Conditions of Zakat", type: "text", content: "Zakat is required for those who meet the nisab threshold and have wealth for a full lunar year." },
      { id: 402, title: "Recipients of Zakat", type: "video", content: "https://www.youtube.com/embed/samplevideo4" }
    ]
  },
  { id: 5, title: "Module 5", subheadings: [
      { id: 501, title: "Spiritual Benefits", type: "text", content: "Fasting and Zakat help purify the soul and strengthen faith in Allah." },
      { id: 502, title: "Common Misconceptions", type: "video", content: "https://www.youtube.com/embed/samplevideo5" }
    ]
  }
];

export default function CourseContent() {
  const [currentModule, setCurrentModule] = useState(null);
  const [currentSubheading, setCurrentSubheading] = useState(null);
  const [completedSubheadings, setCompletedSubheadings] = useState({});

  const handleComplete = (subheadingId) => {
    setCompletedSubheadings((prev) => ({ ...prev, [subheadingId]: true }));
  };

  const handleNext = () => {
    if (!currentModule || !currentSubheading) return;
    const currentIndex = currentModule.subheadings.findIndex(sub => sub.id === currentSubheading.id);
    if (currentIndex < currentModule.subheadings.length - 1) {
      setCurrentSubheading(currentModule.subheadings[currentIndex + 1]);
    } else {
      const nextModuleIndex = modules.findIndex(mod => mod.id === currentModule.id) + 1;
      if (nextModuleIndex < modules.length) {
        setCurrentModule(modules[nextModuleIndex]);
        setCurrentSubheading(modules[nextModuleIndex].subheadings[0]);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 p-5">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/4 bg-[#0E2431] p-5 text-white rounded-lg shadow-lg overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-4">The Fiqh of Fasting and Zakat</h2>
        <ul>
          {modules.map((module) => (
            <li key={module.id} className="mb-4">
              <div
                className={`cursor-pointer font-semibold p-2 rounded-lg ${currentModule?.id === module.id ? "bg-yellow-300 text-blue-900" : "text-white"}`}
                onClick={() => setCurrentModule(module.id === currentModule?.id ? null : module)}
              >
                {module.title}
              </div>
              {currentModule?.id === module.id && (
                <ul className="ml-4 mt-2">
                  {module.subheadings.map((sub) => (
                    <li key={sub.id} className="mb-2">
                      <div
                        className={`cursor-pointer p-2 rounded-lg ${currentSubheading?.id === sub.id ? "bg-gray-200 text-blue-900" : "text-white"}`}
                        onClick={() => setCurrentSubheading(sub)}
                      >
                        ▶ {sub.title}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-10 bg-white rounded-lg shadow-md overflow-auto"
      >
        {currentSubheading ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentSubheading.title}</h2>
            {currentSubheading.type === "text" ? (
              <p className="text-gray-700">{currentSubheading.content}</p>
            ) : (
              <iframe
                width="100%"
                height="400"
                src={currentSubheading.content}
                title={currentSubheading.title}
                frameBorder="0"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            )}
            <div className="mt-4">
              <button
                onClick={() => handleComplete(currentSubheading.id)}
                className="p-2 bg-primaryColor text-white rounded-lg"
              >
                Mark as Completed
              </button>
              {completedSubheadings[currentSubheading.id] && (
                <button
                  onClick={handleNext}
                  className="ml-4 p-2 bg-primaryColor text-white rounded-lg"
                >
                  ✅
                </button>
              )}
            </div>
          </>
        ) : (
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Select a Module and Subheading to View Content</h2>
        )}
      </motion.div>
    </div>
  );
}
