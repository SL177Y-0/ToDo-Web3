import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ContractService } from '../../contract/service/contract.service';
import { TaskRepository } from '../repository/task.repository';
import { CreateTaskDto } from '../dtos/task.dto';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly contractService: ContractService,
    private readonly taskRepository: TaskRepository,
  ) {}

  getServerTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  }

  async createTask(userId: string, data: CreateTaskDto) {
    try {
      const isValid = await this.contractService.isValidHash(data.task_hash);
      if (!isValid) throw new BadRequestException('Invalid task hash');

      return this.taskRepository.create({
        title: data.title,
        task_hash: data.task_hash,
        user_id: userId,
        priority: data.priority,
        due_date: data.due_date,
      });
    } catch (error) {
      this.logger.error(`Failed to create task: ${error.message}`, error.stack);
      throw error;
    }
  }
}
