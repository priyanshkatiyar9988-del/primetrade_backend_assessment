const express = require("express");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const validate = require("../middleware/validate");
const {
  taskValidation,
} = require("../validations/taskValidation");

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 *
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     responses:
 *       201:
 *         description: Task created
 */

// User + Admin
router
  .route("/")
  .post(taskValidation, validate, createTask)
  .get(getTasks);

// User can view/update own task, Admin can access all
router
  .route("/:id")
  .get(getTaskById)
  .put(taskValidation, validate, updateTask);

// Only Admin can Delete
router.delete("/:id", authorize("admin"), deleteTask);

module.exports = router;