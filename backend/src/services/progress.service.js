const {
  LectureProgress,
  ChapterProgress,
  CourseProgress,
  QuizProgress,
  Lecture,
  Chapter,
  Quiz,
  Assignment,
  Module,
} = require("../models");

const progressService = {
  // Update lecture progress
  updateLectureProgress: async (
    userId,
    courseId,
    moduleId,
    chapterId,
    lectureId,
    currentTime,
    completed
  ) => {
    // If lectureId is provided, validate it exists
    if (lectureId) {
      const lecture = await Lecture.findById(lectureId);
      if (!lecture) return null;
    }

    // Build the query conditionally
    const query = {
      user: userId,
      chapter: chapterId,
      course: courseId,
      module: moduleId,
    };
    if (lectureId) {
      query.lecture = lectureId;
    }

    let lectureProgress = await LectureProgress.findOne(query);

    if (!lectureProgress) {
      const newProgressData = {
        user: userId,
        chapter: chapterId,
        course: courseId,
        module: moduleId,
        currentTime,
        completed,
      };
      if (lectureId) {
        newProgressData.lecture = lectureId;
      }

      lectureProgress = new LectureProgress(newProgressData);
    } else {
      lectureProgress.currentTime = currentTime;
      lectureProgress.completed = completed;
    }

    await lectureProgress.save();

    // === CHAPTER PROGRESS ===
    if (completed) {
      let chapterProgress = await ChapterProgress.findOne({
        user: userId,
        chapter: chapterId,
      });

      if (!chapterProgress) {
        chapterProgress = new ChapterProgress({
          user: userId,
          chapter: chapterId,
          module: moduleId,
          course: courseId,
          lectureCompleted: true,
        });
      } else {
        chapterProgress.lectureCompleted = true;
      }
      await chapterProgress.save();

      // === COURSE PROGRESS ===
      let courseProgress = await CourseProgress.findOne({
        user: userId,
        course: courseId,
      });

      if (!courseProgress) {
        courseProgress = new CourseProgress({
          user: userId,
          course: courseId,
          completedChapters: [chapterId],
          completed: false,
        });
      } else {
        if (!courseProgress.completedChapters.includes(chapterId)) {
          courseProgress.completedChapters.push(chapterId);
        }
      }

      const courseModules = await Module.find({ course: courseId }).select(
        "_id"
      );
      const moduleIds = courseModules.map((m) => m._id);

      const allCourseChapters = await Chapter.find({
        module: { $in: moduleIds },
      }).select("_id");
      const allChapterIds = allCourseChapters.map((ch) => ch._id.toString());
      const completedChapterIds = courseProgress.completedChapters.map((id) =>
        id.toString()
      );

      const isCourseCompleted = allChapterIds.every((id) =>
        completedChapterIds.includes(id)
      );
      courseProgress.completed = isCourseCompleted;
      courseProgress.completedAt = new Date().toLocaleDateString();

      await courseProgress.save();
    }

    return lectureProgress;
  },
  // Submit quiz progress
  submitQuizProgress: async (
    userId,
    chapterId,
    moduleId,
    courseId,
    quizId,
    answers
  ) => {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return null;

    let score = 0;
    const total = quiz.questions.length;
    const evaluatedAnswers = quiz.questions.map((q, index) => {
      const userAnswer = answers[index];
      const isCorrect = q.correctAnswer === userAnswer;
      if (isCorrect) score += 1;
      return {
        question: q.question,
        selectedOption: userAnswer,
        isCorrect,
      };
    });

    // 💥 Delete existing progress if it exists
    await QuizProgress.deleteMany({
      user: userId,
      quiz: quizId,
      chapter: chapterId,
      course: courseId,
    });

    // 💾 Save new progress
    const quizProgress = new QuizProgress({
      user: userId,
      quiz: quizId,
      chapter: chapterId,
      course: courseId,
      score,
      total,
      answers: evaluatedAnswers,
    });
    await quizProgress.save();

    // ✅ Update or create chapter progress
    let chapterProgress = await ChapterProgress.findOne({
      user: userId,
      chapter: chapterId,
    });

    if (!chapterProgress) {
      chapterProgress = new ChapterProgress({
        user: userId,
        chapter: chapterId,
        module: moduleId,
        course: courseId,
        quizCompleted: true,
      });
    } else {
      chapterProgress.quizCompleted = true;
    }

    await chapterProgress.save();

    return quizProgress;
  },

  getQuizProgress: async (userId, chapterId, moduleId, courseId, quizId) => {
    const quizProgress = QuizProgress.findOne({
      user: userId,
      quiz: quizId,
      chapter: chapterId,
      course: courseId,
    });
    return quizProgress;
  },

  // Mark assignment as submitted
  markAssignmentSubmitted: async (userId, assignmentId) => {
    const assignment = await Assignment.findById(assignmentId).populate(
      "chapter"
    );
    if (!assignment) return null;

    const chapter = assignment.chapter;
    const course = chapter.course;

    let chapterProgress = await ChapterProgress.findOne({
      user: userId,
      chapter: chapter._id,
    });
    if (!chapterProgress) {
      chapterProgress = new ChapterProgress({
        user: userId,
        chapter: chapter._id,
        module: chapter.module,
        course,
        assignmentSubmitted: true,
      });
    } else {
      chapterProgress.assignmentSubmitted = true;
    }
    await chapterProgress.save();

    return chapterProgress;
  },

  // Get course progress
  getCourseProgress: async (userId, courseId) => {
    const courseProgress = await CourseProgress.findOne({
      user: userId,
      course: courseId,
    })
      .populate("currentLecture")
      .populate("currentChapter")
      .populate("completedChapters");
    return courseProgress;
  },
};

module.exports = progressService;
