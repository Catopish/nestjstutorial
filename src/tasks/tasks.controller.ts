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
import { user } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: user,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: user): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }
  @Post()
  createTask(
    @Body() createTaskDTO: createTaskDto,
    @GetUser() user: user,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDTO, user);
  }
  @Delete('/:id')
  delTaskById(@Param('id') id: string, @GetUser() user: user): Promise<void> {
    return this.taskService.delTaskById(id, user);
  }
  @Patch('/:id/status')
  patchTaskById(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDto,
    @GetUser() user: user,
  ): Promise<Task> {
    const { status } = updateTaskStatusDTO;
    return this.taskService.patchTaskByid(id, status, user);
  }
}
