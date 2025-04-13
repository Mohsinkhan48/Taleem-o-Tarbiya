const fs = require("fs");
const path = require("path");
const multer = require("multer");
const CourseModel = require("../Models/course");
const EnrollmentModel = require("../Models/enrollment");

// ✅ Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Use absolute path
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// ✅ Multer upload middleware
const upload = multer({ storage });

// ✅ Create a new course (with image upload)
const createCourse = async (req, res) => {
    try {
        const courseData = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Course image is required" });
        }

        courseData.image = `/uploads/${req.file.filename}`;

        // 🧠 Parse possible JSON strings
        if (courseData.modules && typeof courseData.modules === "string") {
            try {
              courseData.modules = JSON.parse(courseData.modules);
            } catch (err) {
              return res.status(400).json({ success: false, message: "Invalid JSON format in modules" });
            }
          }

        // 🧠 Validate fields
        if (
            !courseData.title || 
            !courseData.content || 
            !courseData.duration || 
            !courseData.price || 
            !courseData.level || 
            !courseData.category || 
            !courseData.instructor
        ) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        courseData.price = parseFloat(courseData.price);
        if (isNaN(courseData.price) || courseData.price <= 0) {
            return res.status(400).json({ success: false, message: "Price must be a valid number greater than 0" });
        }

        if (!courseData.instructor.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid instructor ID format" });
        }

        // ✅ Defaults
        courseData.ratings = courseData.ratings || [];
        courseData.students = courseData.students || [];

        // 🧠 Debug logs
        console.log("Incoming course data:", courseData);
        console.log("Uploaded image:", req.file);

        const newCourse = new CourseModel(courseData);
        await newCourse.save();

        res.status(201).json({ success: true, message: "Course created successfully", course: newCourse });
    } catch (error) {
        console.error("Error creating course:", error.stack);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// ✅ Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await CourseModel.find().populate("instructor", "name email");
        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ Get a single course by ID
const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await CourseModel.findById(id).populate("instructor", "name email");

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // Check if user has paid for the course to show the content
        const userId = req.userId; // You can use middleware to set this
        const enrollment = await EnrollmentModel.findOne({ userId, courseId: id });

        if (!enrollment || enrollment.paymentStatus !== "paid") {
            return res.status(403).json({ success: false, message: "Payment required to access content" });
        }

        res.status(200).json({ success: true, course });
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ Update a course (including image update)
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        // Check if a new image was uploaded
        if (req.file) {
            updatedData.image = `/uploads/${req.file.filename}`; // Update image path
        }

        const updatedCourse = await CourseModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        res.status(200).json({ success: true, message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ Delete a course
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await CourseModel.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        res.status(200).json({ success: true, message: "Course deleted successfully" });
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    upload, // Export multer upload middleware
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};
