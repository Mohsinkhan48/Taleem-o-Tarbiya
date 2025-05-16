// src/components/lecture/ManageLectures.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppDispatch, RootState } from "../../../../redux/store";
import { Loader } from "../../../../assets/Loader";
import Modal from "../../../Reusable/Modal";
import LectureForm from "../CreateCourse/LectureForm";
import { fetchInstructoryCourseById } from "../../../../redux/slices/getInstructorCourseByIdSlice";
import { Lecture } from "../../../../types/course.types";
import { FaPlayCircle, FaRegTimesCircle } from "react-icons/fa";
import { BsPlayBtnFill } from "react-icons/bs";

const ManageLectures: React.FC = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { instructorCourse: course, loading } = useSelector(
    (state: RootState) => state.instructorCourse
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<{
    moduleId: string;
    chapterId: string;
    lecture?: Lecture;
  } | null>(null);

  useEffect(() => {
    if (courseId) dispatch(fetchInstructoryCourseById(courseId));
  }, [courseId]);

  const handleChapterClick = (
    moduleId: string,
    chapterId: string,
    lecture?: Lecture
  ) => {
    setSelectedChapter({ moduleId, chapterId, lecture });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (courseId) dispatch(fetchInstructoryCourseById(courseId));
    setIsModalOpen(false);
    setSelectedChapter(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <Loader className="text-text" size={30} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-error text-center text-lg mt-10 font-medium">
        No Course Found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 text-text">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        Manage Lectures
      </h1>

      <div className="space-y-6">
        {course.modules.map((module) => (
          <div
            key={module._id}
            className="border border-border bg-card rounded-xl p-4 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              {module.title}
            </h2>
            <div className="grid gap-2">
              {module.chapters.map((chapter) => (
                <div
                  key={chapter._id}
                  onClick={() =>
                    handleChapterClick(
                      module._id!,
                      chapter._id!,
                      chapter.lecture
                    )
                  }
                  className="cursor-pointer px-4 py-2 rounded-md bg-background hover:bg-secondary/10 flex justify-between items-center transition group"
                >
                  <div className="flex items-center gap-2">
                    <BsPlayBtnFill className="text-lg text-link group-hover:text-link-hover" />
                    <span className="font-medium">{chapter.title}</span>
                  </div>
                  {chapter.lecture ? (
                    <span className="flex items-center gap-1 text-success text-sm font-semibold">
                      <FaPlayCircle />
                      Has Lecture
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-warning text-sm font-semibold">
                      <FaRegTimesCircle />
                      No Lecture
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedChapter && courseId && (
          <LectureForm
            courseId={courseId}
            moduleId={selectedChapter.moduleId}
            chapterId={selectedChapter.chapterId}
            existingLecture={selectedChapter.lecture}
            onClose={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default ManageLectures;
