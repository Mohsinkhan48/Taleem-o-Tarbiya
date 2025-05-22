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
import FileInput from "../../../Reusable/FileInput";
import { BACKEND_URL, SERVER_URL } from "../../../../constants/env.constants";
import apiClient from "../../../../api/apiClient";
import Button from "../../../Reusable/Button"; // If you're using a custom Button

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

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

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

  const handlePreviewUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!file || !courseId) {
      setErrorMsg("Please select a file before uploading.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("video", file);

      const { data } = await apiClient.post(
        `${SERVER_URL}course/upload-preview-video/${courseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setSuccessMsg("Preview video uploaded successfully!");
      } else {
        setErrorMsg("Upload failed. Please try again.");
      }

      setFile(null);
      dispatch(fetchInstructoryCourseById(courseId)); // Refresh course data
    } catch (error: any) {
      console.error("Upload error:", error);
      setErrorMsg("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
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
  const openPreviewModal = () => setIsPreviewModalOpen(true);
  const closePreviewModal = () => setIsPreviewModalOpen(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 text-text">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        Manage Lectures
      </h1>

      {/* Upload Preview Video */}
      <form onSubmit={handlePreviewUpload} className="space-y-4">
        <FileInput
          label={"Upload Preview Video"}
          onChange={setFile}
          required={true}
        />

        {successMsg && (
          <div className="text-success text-sm font-medium">{successMsg}</div>
        )}
        {errorMsg && (
          <div className="text-error text-sm font-medium">{errorMsg}</div>
        )}

        <div className="flex justify-end space-x-2">
          <Button type="submit" isLoading={uploading} variant="primary">
            {course.previewUrl ? "Edit Preview Video" : "Upload Preview Video"}
          </Button>
          {course.previewUrl && (
            <Button
              type="button"
              variant="secondary"
              onClick={openPreviewModal}
            >
              View
            </Button>
          )}
        </div>
      </form>

      {/* Modules & Chapters */}
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
      <Modal isOpen={isPreviewModalOpen} onClose={closePreviewModal}>
        <div className="w-full h-full">
          <video
            controls
            className="w-full h-auto rounded-lg"
            src={
              course.previewUrl?.startsWith("http")
                ? course.previewUrl
                : `${BACKEND_URL}${course.previewUrl}`
            }
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </Modal>
    </div>
  );
};

export default ManageLectures;
