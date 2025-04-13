const EnrollmentModel = require("../Models/enrollment");
const CourseModel = require("../Models/course");

const enrollInCourse = async (req, res) => {
    try {
        const { userId } = req;
        const { courseId } = req.body;

        // Check if course exists
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // Check if already enrolled
        const existingEnrollment = await EnrollmentModel.findOne({ userId, courseId });
        if (existingEnrollment) {
            return res.status(200).json({ 
                success: true, 
                message: "Already enrolled",
                courseId: course._id 
            });
        }

        // Create enrollment
        const newEnrollment = new EnrollmentModel({
            userId,
            courseId,
            paymentStatus: "free_access" // Mark as free access for now
        });
        await newEnrollment.save();

        // Add user to course students
        course.students.push(userId);
        await course.save();

        res.status(200).json({ 
            success: true, 
            message: "Enrollment successful",
            courseId: course._id 
        });

    } catch (error) {
        console.error("Error in enrollInCourse:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    enrollInCourse
};