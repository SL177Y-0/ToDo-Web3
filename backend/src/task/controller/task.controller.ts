import { Controller, Get, Post, Body, Param, UseGuards, Logger } from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { CreateTaskDto } from '../dtos/task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  private readonly logger = new Logger(TaskController.name);

  constructor(private readonly taskService: TaskService) {}

  @Get('timestamp')
  getTimestamp() {
    return { timestamp: Date.now() };
  }

  @Post()
  async createTask(@GetUser('id') userId: string, @Body() dto: CreateTaskDto) {
    this.logger.log(`Creating task for user ${userId}`);
    return this.taskService.createTask(userId, dto);
  }
}
