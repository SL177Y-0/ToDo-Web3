const express = require('express');
const router = express.Router();
const {
  createTask,
  updateTask,
  deleteTask,
  viewTask,
  allTasks,
  prioritizeTasksController,
  setReminder,
  getReminders,
  predictTaskCompletionController,
  completeTask
} = require('../controllers/controllers');

router.route('/create-task').post(createTask);
router.route('/update-task').post(updateTask);
router.route('/delete-task/:taskId').delete(deleteTask);
router.route('/view-task/:taskId').get(viewTask);
router.route('/view-all-task').get(allTasks);
router.route('/prioritize-tasks').get(prioritizeTasksController);
router.route('/set-reminder').post(setReminder);
router.route('/get-reminders').get(getReminders);
router.route('/predict-task-completion').post(predictTaskCompletionController);
router.route('/complete-task').post(completeTask);

module.exports = router;
