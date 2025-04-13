const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },

  modules: [
    {
      title: {
        type: String,
        required: true,
      },
      chapters: [
        {
          title: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
          videoUrl: {
            type: String, // Link to video (e.g., Cloudinary, S3, etc.)
          },
          resources: [
            {
              name: String,
              url: String, // Link to PDFs, Docs, etc.
            },
          ],
          isPreview: {
            type: Boolean,
            default: false, // Publicly viewable without purchase
          },
          quiz: {
            title: String,
            questions: [
              {
                question: String,
                options: [String],
                correctAnswer: String,
              },
            ],
          },
          assignment: {
            title: String,
            description: String,
            dueDate: Date,
            submissionType: {
              type: String,
              enum: ["file", "text", "link"],
              default: "file",
            },
          },
        },
      ],
    },
  ],

  ratings: {
    type: [Number],
    default: [],
  },

  instructor: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },

  students: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      completedChapters: [String],
      quizScores: [
        {
          moduleId: Schema.Types.ObjectId,
          chapterTitle: String,
          score: Number,
        },
      ],
      assignmentSubmissions: [
        {
          moduleId: Schema.Types.ObjectId,
          chapterTitle: String,
          submittedAt: Date,
          fileUrl: String,
          grade: Number,
        },
      ],
    },
  ],

  category: {
    type: String,
    required: true,
    trim: true,
  },

  isPaid: {
    type: Boolean,
    default: false,
  },
},
{ timestamps: true }
);

const CourseModel = mongoose.model("courses", CourseSchema);
module.exports = CourseModel;
