export class Task {
    id: string;
    title: string;
    task_hash: string;
    user_id: string;
    priority: number;
    due_date: Date;
    status: string; // You can use an enum or specific type for status
    createdAt: Date;
    updatedAt: Date;
  }