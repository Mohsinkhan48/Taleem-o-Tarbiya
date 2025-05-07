// src/pages/CourseUploadPage.tsx

import LectureForm from "./LectureForm";

const CourseUploadPage = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-text mb-4">Upload Lecture</h1>
      <LectureForm
        courseId="680ac38d11d5083045664ddb"
        moduleId="681983912a2e99a25551d25c"
        chapterId="681983922a2e99a25551d274"
      />
    </div>
  );
};

export default CourseUploadPage;
