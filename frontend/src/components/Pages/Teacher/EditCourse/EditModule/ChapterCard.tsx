import { BiVideo, BiEdit, BiUpload, BiPlusCircle } from "react-icons/bi";
import { FaRegFileAlt, FaTasks, FaQuestionCircle } from "react-icons/fa";
import { Chapter } from "../../../../../types/course.types";
import AccordionItem from "../../../../Reusable/AccordianItem";
import DropdownMenu from "../../../../Reusable/DropdownMenu";
import DropdownItem from "../../../../Reusable/DropdownItem";

const ChapterCard = ({ chapter }: { chapter: Chapter }) => {
  return (
    <AccordionItem
      header={
        <div className="flex justify-between gap-10 items-center w-full">
          <span>{chapter.title}</span>
          <DropdownMenu
            button={<BiEdit size={18} />}
          >
            <div className="bg-card border border-card-border rounded-md p-1 text-text">
              <DropdownItem onClick={() => console.log("Edit Chapter")}>
                Edit Chapter
              </DropdownItem>
              {!chapter.quiz && (
                <DropdownItem onClick={() => console.log("Add Quiz")}>
                  Add Quiz
                </DropdownItem>
              )}
              {!chapter.assignment && (
                <DropdownItem onClick={() => console.log("Add Assignment")}>
                  Add Assignment
                </DropdownItem>
              )}
              <DropdownItem onClick={() => console.log("Add/Edit Resources")}>
                Add Resources
              </DropdownItem>
              <DropdownItem onClick={() => console.log("Upload/Change Video")}>
                Upload/Change Video
              </DropdownItem>{" "}
            </div>
          </DropdownMenu>
        </div>
      }
    >
      <div className="text-text bg-background p-6 rounded-lg border border-border mt-1 space-y-4">
        {/* Quiz Section */}
        {chapter.quiz ? (
          <div className="flex items-center gap-2">
            <FaQuestionCircle />
            <span>{chapter.quiz.title}</span>
          </div>
        ) : (
          <button className="flex items-center gap-2 text-sm text-primary">
            <BiPlusCircle />
            Add Quiz
          </button>
        )}

        {/* Assignment Section */}
        {chapter.assignment ? (
          <div className="flex items-center gap-2">
            <FaTasks />
            <span>{chapter.assignment.title}</span>
          </div>
        ) : (
          <button className="flex items-center gap-2 text-sm text-primary">
            <BiPlusCircle />
            Add Assignment
          </button>
        )}

        {/* Video Section */}
        <div className="flex items-center gap-2">
          <BiVideo />
          <span>
            {chapter.lecture?.videoUrl ? "Lecture Video Uploaded" : "No Video Uploaded"}
          </span>
          <button className="text-sm text-primary flex items-center gap-1 ml-4">
            <BiUpload />
            {chapter.lecture?.videoUrl ? "Change Video" : "Upload Video"}
          </button>
        </div>

        {/* Resources Section */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FaRegFileAlt />
            <span>Resources</span>
            <button className="ml-4 text-sm text-primary flex items-center gap-1">
              <BiPlusCircle />
              Add Resources
            </button>
          </div>
          <div className="ml-6 space-y-1">
            {chapter.resources?.map((resource, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>{resource.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AccordionItem>
  );
};

export default ChapterCard;
