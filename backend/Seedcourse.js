const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const CourseModel = require("./Models/course");
const CourseModel = require('./Models/course')
// const UserModel = require("./Models/User");
const UserModel = require('./Models/User')

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.Mongo_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

const seedCourses = async () => {
  try {
    // Fetch an instructor (assumes a teacher exists)
    let instructor = await UserModel.findOne({ role: "teacher" });

    // If no instructor exists, create one
    if (!instructor) {
      instructor = await UserModel.create({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "hashedpassword123", // Make sure to hash passwords in real use cases
        role: "teacher",
      });
    }

    // Fetch existing students (optional, you can also create dummy ones)
    const students = await UserModel.find({ role: "learner" }).limit(5); // Get 5 learners

    // Create courses
    const defaultCourses = [
      {
        image:
          "https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg?auto=compress&cs=tinysrgb&w=600",
        title: "JavaScript Basics",
        content: "Learn the fundamentals of JavaScript, the language of the web.",
        duration: "4 weeks",
        price: 29.99,
        chapters: 10,
        ratings: [4.5],
        instructor: instructor._id, // Use valid ObjectId
        level: "Beginner",
        students: students.map((s) => s._id), // Store valid ObjectIds
        category: "Programming", // Add required category field
      },
      {
        image:
          "https://images.pexels.com/photos/2291592/pexels-photo-2291592.jpeg?auto=compress&cs=tinysrgb&w=600",
        title: "React.js Mastery",
        content: "Master React.js and build dynamic front-end applications.",
        duration: "6 weeks",
        price: 49.99,
        chapters: 15,
        ratings: [4.7],
        instructor: instructor._id,
        level: "Intermediate",
        students: students.map((s) => s._id),
        category: "Web Development",
      },
    ];

    await CourseModel.deleteMany(); // Remove existing courses
    await CourseModel.insertMany(defaultCourses); // Insert new courses
    console.log("Default courses added successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding courses:", error);
  }
};

seedCourses();
