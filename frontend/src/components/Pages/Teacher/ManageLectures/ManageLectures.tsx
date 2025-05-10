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
    return <div className="text-text">No Course Found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 text-text">
      <div className="space-y-6">
        {course.modules.map((module) => (
          <div key={module._id} className="border-b border-border pb-4">
            <h2 className="text-xl font-semibold mb-2">{module.title}</h2>
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
                  className="cursor-pointer hover:text-primary underline flex items-center space-x-2"
                >
                  <span>{chapter.title}</span>
                  {chapter.lecture ? (
                    <span className="text-sm text-success">● Has Lecture</span>
                  ) : (
                    <span className="text-sm text-warning">● No Lecture</span>
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
