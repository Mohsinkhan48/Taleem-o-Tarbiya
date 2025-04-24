const { CourseTag } = require("../models");

const courseTags = [
  { name: "Zakat" },
  { name: "Hajj" },
  { name: "Aqaid" },
  { name: "Fiqh" },
  { name: "History" },
  { name: "Hadith" },
  { name: "Quran" },
  { name: "Sunnah" },
];

async function seedCourseTags() {
  try {
    for (const tag of courseTags) {
      const exists = await CourseTag.findOne({ name: tag.name });
      if (!exists) {
        await CourseTag.create(tag);
        console.log(`✅ Seeded tag: "${tag.name}"`);
      } else {
        console.log(`ℹ️ Tag "${tag.name}" already exists.`);
      }
    }
  } catch (error) {
    console.error("❌ Error seeding tags:", error.message);
  }
}

module.exports = seedCourseTags;
