const objectId = (value, helpers) => {
  if (!value || !value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const fullName = (value, helpers) => {
  if (!value || !value.match(/^[a-zA-Z ]+$/)) {
    return helpers.message("Name must only contain letters and spaces.");
  }
  return value;
};

module.exports = { objectId, fullName };
