const userSanitizer = (user) => {
  return {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    role: user.role
  };
};

const courseSanitizer = (course) => {
  return {
    _id: course._id,
    image: course.image,
    title: course.title,
    description: course.description,
    content: course.content,
    duration: course.duration,
    price: course.price,
    level: course.level,
    instructor: course.instructor,
    ratings: course.ratings,
    category: course.category,
    isPaid: course.isPaid,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt
  };
};

module.exports = { userSanitizer, courseSanitizer };
