const CourseFilters = (query) => {
  const filters = {};

  if (query.category) {
    filters.category = query.category;
  }

  if (query.level) {
    filters.level = query.level;
  }

  if (query.instructor) {
    filters.instructor = query.instructor;
  }

  if (query.isPaid !== undefined) {
    filters.isPaid = query.isPaid === "true";
  }

  if (query.tag) {
    filters.tags = { $in: [query.tag] };
  }

  if (query.tags) {
    const tagArray = Array.isArray(query.tags)
      ? query.tags
      : query.tags.split(",");
    filters.tags = { $in: tagArray };
  }

  if (query.search) {
    filters.title = { $regex: query.search, $options: "i" };
  }

  return filters;
};

module.exports = { CourseFilters };
