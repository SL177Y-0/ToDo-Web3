import { Injectable, Logger } from '@nestjs/common';
import { Task, TaskStatus, User } from '@prisma/client';
import { CohereClient } from 'cohere-ai';

@Injectable()
export class AISuggestionService {
  private cohere: CohereClient;
  private readonly logger = new Logger(AISuggestionService.name);

  constructor() {
    this.cohere = new CohereClient({
      token: process.env.COHERE_API_KEY,
    });
  }

  async suggestPriorities(tasks: Task[]) {
    tasks = tasks.filter((task) => task.status !== TaskStatus.COMPLETED);
    try {
      const prompt = `Given these tasks, analyze and suggest priorities (0-5) based on deadlines and titles:
        ${tasks
          .map(
            (task) =>
              `- Title: ${task.title}
           Due Date: ${task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
           Current Priority: ${task.priority}`,
          )
          .join('\n')}

        For each task, provide a suggested priority and a brief explanation why.
        Format: Task: [title] -> Reason: [reason]`;

      const response = await this.cohere.generate({
        prompt,
        model: 'command',
        temperature: 0.7,
        maxTokens: 300,
      });

      return response.generations[0].text;
    } catch (error) {
      this.logger.error('Error suggesting priorities:', error);
      throw error;
    }
  }

  async getProductivityTip(completedTasks: number, totalTasks: number) {
    try {
      const prompt = `As a productivity coach, provide a short, motivational tip for someone who has completed ${completedTasks} out of ${totalTasks} tasks.
        Keep it concise, positive, and actionable.`;

      const response = await this.cohere.generate({
        prompt,
        model: 'command',
        temperature: 0.8,
        maxTokens: 100,
      });

      return response.generations[0].text;
    } catch (error) {
      this.logger.error('Error generating productivity tip:', error);
      throw error;
    }
  }

  async generateReminders(tasks: Task[], user: User) {
    const overdueTasks = tasks.filter(
      (task) =>
        task.due_date &&
        new Date(task.due_date) < new Date() &&
        task.status !== 'COMPLETED',
    );

    if (overdueTasks.length === 0) return null;

    try {
      const prompt = `Create friendly but urgent reminders for these overdue tasks:
        ${overdueTasks
          .map(
            (task) =>
              `- ${task.title} (Due: ${new Date(task.due_date!).toLocaleDateString()})`,
          )
          .join('\n')}

          user name is: ${user.first_name} ${user.last_name}
        
        For each task, Give me only one reminder, Provide personalized, motivating reminders that encourage task completion.
        Format: Task: [title] -> Reminder: [reminder message]
        `;

      const response = await this.cohere.generate({
        prompt,
        model: 'command',
        temperature: 0.7,
        maxTokens: 200,
      });

      return response.generations[0].text;
    } catch (error) {
      this.logger.error('Error generating reminders:', error);
      throw error;
    }
  }
}
