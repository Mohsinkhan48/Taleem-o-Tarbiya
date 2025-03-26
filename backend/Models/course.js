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
        min: 0 // Ensure price is non-negative
    },
    chapters: {
        type: Number,
        required: true,
        min: 1
    },
    ratings: {
        type: [Number], // Stores multiple ratings instead of a single number
        default: [] 
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "users", // Reference to UserModel
        required: true,
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"], // Restrict values to specific levels
        required: true,
    },
    students: {
        type: [Schema.Types.ObjectId], // Store enrolled students' ObjectIds
        ref: "users",
        default: []
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true }); // Adds createdAt & updatedAt fields automatically

const CourseModel = mongoose.model("courses", CourseSchema);
module.exports = CourseModel;
