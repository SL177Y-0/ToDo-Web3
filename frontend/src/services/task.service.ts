import { TaskStatus } from "@/types/task";
import api from "./api.service";

export const taskService = {
  async getTasks(params?: { status?: TaskStatus; page?: number; limit?: number }) {
    try {
      const response = await api.get("/tasks", { params });
      return {
        tasks: Array.isArray(response.data?.tasks) ? response.data.tasks : [],
        total: response.data?.total || 0,
      };
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return { tasks: [], total: 0 };
    }
  },

  async getTimestamp() {
    try {
      const response = await api.get("/tasks/timestamp");
      return response.data || null;
    } catch (error) {
      console.error("Error fetching timestamp:", error);
      return null;
    }
  },

  async createTask(data: {
    title: string;
    priority: number;
    due_date?: Date;
    task_hash: string;
    user_address: string;
    timestamp: number;
  }) {
    try {
      const response = await api.post("/tasks", data);
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },
};
