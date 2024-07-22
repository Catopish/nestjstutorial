import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskDTO: createTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDTO);
  }
  @Delete('/:id')
  delTaskById(@Param('id') id: string): Promise<void> {
    return this.taskService.delTaskById(id);
  }
  @Patch('/:id/status')
  patchTaskById(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDTO;
    return this.taskService.patchTaskByid(id, status);
  }
}
