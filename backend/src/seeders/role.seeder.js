const { ROLES } = require("../constants");
const Role = require("../models/role.model");

const roles = [
  {
    name: ROLES.ADMIN,
    description: "Role for admin user",
  },
  {
    name: ROLES.STUDENT,
    description: "Role for student user",
  },
  {
    name: ROLES.TEACHER,
    description: "Role for teacher user",
  },
];

// Function to seed roles
async function seedRoles() {
  try {
    for (const roleData of roles) {
      const existingRole = await Role.findOne({ name: roleData.name });

      if (!existingRole) {
        await Role.create(roleData);
        console.log(`Role "${roleData.name}" seeded successfully.`);
      }
    }
  } catch (error) {
    console.error("Error seeding roles:", error);
  }
}

// Export the seedRoles function for use in other files
module.exports = seedRoles;
