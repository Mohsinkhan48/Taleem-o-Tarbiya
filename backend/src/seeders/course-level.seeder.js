const { CourseLevel } = require("../models");

const courseLevels = [
  {
    name: "Beginner",
    description: "Introductory courses for those with little to no prior knowledge.",
  },
  {
    name: "Intermediate",
    description: "Courses for learners with some background knowledge.",
  },
  {
    name: "Advanced",
    description: "Courses for in-depth, advanced-level learners.",
  },
  {
    name: "Expert",
    description: "Courses for professionals and scholars with strong foundations.",
  },
  {
    name: "All Levels",
    description: "Courses suitable for learners of all experience levels.",
  },
];

async function seedCourseLevels() {
  try {
    for (const level of courseLevels) {
      const exists = await CourseLevel.findOne({ name: level.name });
      if (!exists) {
        await CourseLevel.create(level);
        console.log(`✅ Seeded course level: "${level.name}"`);
      } else {
        console.log(`ℹ️ Course level "${level.name}" already exists.`);
      }
    }
  } catch (error) {
    console.error("❌ Error seeding course levels:", error.message);
  }
}

module.exports = seedCourseLevels;
