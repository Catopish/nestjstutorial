import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { createTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }
  @Delete('/:id')
  delTaskById(@Param('id') id: string): void {
    return this.taskService.delTaskById(id);
  }

  @Patch('/:id/status')
  patchTaskById(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.taskService.patchTaskByid(id, status);
  }

  @Post()
  createTask(@Body() createTaskDTO: createTaskDto): Task {
    return this.taskService.createTask(createTaskDTO);
  }
}
