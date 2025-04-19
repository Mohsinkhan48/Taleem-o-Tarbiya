// components/Course/CourseIncludes.tsx
import React from "react";
import { FaRegFileVideo } from "react-icons/fa6";
import { PiExamBold } from "react-icons/pi";
import { LuNewspaper } from "react-icons/lu";
import { BiTrophy } from "react-icons/bi";

interface CourseIncludesProps {
  courseSummary: {
    total_quizes: number,
    total_assignments: number,
    duration: string
  };
}

const CourseIncludes: React.FC<CourseIncludesProps> = ({ courseSummary }) => {
  const items = [
    {
      icon: <FaRegFileVideo size={20} />,
      label: `${courseSummary.duration} on-demand video`,
    },
    {
      icon: <PiExamBold size={20} />,
      label: `${courseSummary.total_quizes} Quiz${courseSummary.total_quizes !== 1 ? "es" : ""}`,
    },
    {
      icon: <LuNewspaper size={20} />,
      label: `${courseSummary.total_assignments} Assignment${courseSummary.total_assignments !== 1 ? "s" : ""}`,
    },
    {
      icon: <BiTrophy size={20} />,
      label: "Certificate of completion",
    },
  ].filter(Boolean); // Removes `false` values

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
      <h2 className="col-span-full text-xl font-semibold text-text">
        This course includes:
      </h2>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-3 text-text">
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CourseIncludes;
