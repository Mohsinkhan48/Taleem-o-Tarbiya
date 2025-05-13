import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { fetchStudentEnrolledCourse } from "../../../../redux/slices/getStudentEnrolledCourseSlice";
import { Loader } from "../../../../assets/Loader";
import VideoPlayer from "./VideoPlayer";
import CourseDetails from "./CourseDetails";
import InstructorCard from "./InstructorCard";
import ModuleAccordion from "./ModuleAccordian";
import { setSelectedChapter } from "../../../../redux/slices/selectedChapter";
import Modal from "../../../Reusable/Modal";
import CertificateViewer from "./CertificateViewer";

const CourseViewer: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ modal state

  useEffect(() => {
    dispatch(fetchStudentEnrolledCourse(id!));
  }, [id]);

  const { singleCourse: course, loading } = useSelector(
    (state: RootState) => state.studentCourse
  );
  const { chapter, courseId, moduleId } = useSelector(
    (state: RootState) => state.selectedChapter
  );

  useEffect(() => {
    if (
      course &&
      course.modules.length > 0 &&
      course.modules[0].chapters.length > 0
    ) {
      dispatch(
        setSelectedChapter({
          chapter: course.modules[0].chapters[0],
          moduleId: course.modules[0]?._id!,
          courseId: course._id,
        })
      );
    }
  }, [course]);

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
    <div className="flex bg-background min-h-screen text-text gap-4 py-10 pl-10 pr-3">
      <main className="flex-1 space-y-6 overflow-y-auto">
        {chapter && (
          <VideoPlayer
            videoUrl={chapter?.lecture?.videoUrl!}
            lectureId={chapter?.lecture?._id!}
            isCompleted={chapter.lecture?.progress?.completed!}
            initialWatchedTime={chapter.lecture?.progress?.currentTime || 0}
            courseId={courseId!}
            moduleId={moduleId!}
            chapterId={chapter._id!}
          />
        )}

        <CourseDetails course={course} />
        <InstructorCard instructor={course.instructor} />

        {/* ✅ Certificate Button */}
        <div className="mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            🎓 View Certificate
          </button>
        </div>
      </main>

      <aside className="w-80 max-h-screen overflow-y-auto">
        <ModuleAccordion modules={course.modules} courseId={course._id} />
      </aside>

      {/* ✅ Certificate Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CertificateViewer courseId={id!} />
      </Modal>
    </div>
  );
};

export default CourseViewer;
