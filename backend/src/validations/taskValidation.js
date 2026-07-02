const { body } = require("express-validator");

exports.taskValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .trim(),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("status")
    .optional()
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Invalid task status"),
];