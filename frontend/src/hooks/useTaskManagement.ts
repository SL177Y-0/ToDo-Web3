import { useState, useEffect } from 'react';

export const useTaskManagement = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    // Fetch tasks from backend
    const response = await fetch('/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const createTask = async (task) => {
    // Custom task creation logic
    await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    // Custom task deletion logic
    await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, createTask, deleteTask };
};