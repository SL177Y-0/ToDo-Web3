const { dateclashCheck, priorityCheck } = require('../model/tasks');
const { contract } = require('../contract/contract');
const { prioritizeTasks, predictTaskCompletion } = require('../langchain');
const axios = require('axios');
const { GEMINI_API_KEY } = require('../config');

const createTask = async (req, res) => {
  const { taskDate } = req.body;
  const task = await dateclashCheck(taskDate);
  try {
    if (task !== "No Task Found") {
      res.status(409).json({ status: 409, message: "Date clash: Task cannot be added" });
    } else {
      res.status(200).json({ status: 200, message: "Task can be added" });
    }
  } catch (error) {
    console.error(error);
  }
};

const updateTask = async (req, res) => {
  const { taskDate } = req.body;
  const task = await dateclashCheck(taskDate);
  try {
    if (task !== "No Task Found") {
      res.status(409).json({ status: 409, message: "Date clash: Task cannot be updated" });
    } else {
      res.status(200).json({ status: 200, message: "Task can be updated" });
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const isTrue = await priorityCheck(taskId);
    if (isTrue) {
      res.status(403).json({ status: 403, message: "Task cannot be deleted" });
    } else {
      res.status(200).json({ status: 200, message: "Task can be deleted" });
    }
  } catch (error) {
    console.error(error);
  }
};

const viewTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    console.log(taskId);
    const task = await contract.methods.viewTask(taskId).call();
    const { id, name, date, completed } = task;
    const numId = Number(id);
    const taskObj = {
      numId, name, date, completed
    };
    res.status(200).json({ status: 200, taskObj, message: "Task Exist" });
  } catch (error) {
    res.status(404).json({ status: 500, message: "Task does not exist" });
    console.error(error);
  }
};

const allTasks = async (req, res) => {
  try {
    const tasks = await contract.methods.allTask().call();
    if (tasks.length < 0) {
      res.status(404).json({ status: 404, message: "Task list does not exist" });
    } else {
      const taskList = tasks.map(({ id, name, date, completed }) => {
        const taskId = Number(id);
        return { taskId, name, date, completed };
      });
      res.status(200).json({ status: 200, taskList, message: "Task Exist" });
    }
  } catch (error) {
    console.error(error);
  }
};

const prioritizeTasksController = async (req, res) => {
  try {
    const tasks = await contract.methods.allTask().call();
    const prioritizedTasks = await prioritizeTasks(tasks);
    res.status(200).json({ status: 200, prioritizedTasks, message: "Tasks prioritized" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Error prioritizing tasks" });
  }
};

const setReminder = async (req, res) => {
  const { taskId, reminderDate } = req.body;
  try {
    // Assuming you have a method to set reminders in your contract
    await contract.methods.setReminder(taskId, reminderDate).send({ from: req.account });
    res.status(200).json({ status: 200, message: "Reminder set successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Error setting reminder" });
  }
};

const getReminders = async (req, res) => {
  try {
    // Assuming you have a method to get reminders in your contract
    const reminders = await contract.methods.getReminders().call();
    res.status(200).json({ status: 200, reminders, message: "Reminders fetched successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Error fetching reminders" });
  }
};

const predictTaskCompletionController = async (req, res) => {
  const { taskDescription } = req.body;

  try {
    const prediction = await predictTaskCompletion(taskDescription);
    res.status(200).json({ status: 200, prediction, message: "Task completion prediction" });
  } catch (error) {
    console.error('Error predicting task completion:', error);
    res.status(500).json({ status: 500, message: "Error predicting task completion" });
  }
};

const completeTask = async (req, res) => {
  const { taskId, completed } = req.body;
  try {
    await contract.methods.completeTask(taskId, completed).send({ from: req.account });
    res.status(200).json({ status: 200, message: "Task completion status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Error updating task completion status" });
  }
};

module.exports = {
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
};