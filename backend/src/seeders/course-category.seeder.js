const { CourseCategory } = require("../models");

const courseCategories = [
  {
    name: "BS",
    description: "Bachelor-level Islamic Studies courses",
  },
  {
    name: "MS",
    description: "Master-level Islamic Studies courses",
  },
  {
    name: "Diploma",
    description: "Diploma-level specialized Islamic courses",
  },
  {
    name: "Short Courses",
    description: "Compact courses on various Islamic topics",
  },
];

async function seedCourseCategories() {
  try {
    for (const category of courseCategories) {
      const exists = await CourseCategory.findOne({ name: category.name });
      if (!exists) {
        await CourseCategory.create(category);
        console.log(`✅ Seeded category: "${category.name}"`);
      } else {
        console.log(`ℹ️ Category "${category.name}" already exists.`);
      }
    }
  } catch (error) {
    console.error("❌ Error seeding categories:", error.message);
  }
}

module.exports = seedCourseCategories;
