import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTaskByFilter(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
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
  patchTaskById(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDto,
  ) {
    const { status } = updateTaskStatusDTO;
    return this.taskService.patchTaskByid(id, status);
  }

  @Post()
  createTask(@Body() createTaskDTO: createTaskDto): Task {
    return this.taskService.createTask(createTaskDTO);
  }
}
