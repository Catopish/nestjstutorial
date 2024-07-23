import { Injectable, NotFoundException } from '@nestjs/common';
// import { TaskStatus } from './task-status.enum';
import { createTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { user } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}
  async getTaskById(id: string, user: user): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id, user });
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }

  async getTasks(filterDTO: GetTasksFilterDto, user: user): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDTO, user);
  }

  createTask(createTaskDTO: createTaskDto, user: user): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO, user);
  }

  async delTaskById(id: string, user: user): Promise<void> {
    const deleted = await this.tasksRepository.delete({ id, user });
    if (deleted.affected === 0) {
      throw new NotFoundException(`Task with ${id} not deleted`);
    }
  }
  async patchTaskByid(
    id: string,
    status: TaskStatus,
    user: user,
  ): Promise<Task> {
    const obj = await this.getTaskById(id, user);
    obj.status = status;
    await this.tasksRepository.save(obj);
    return obj;
  }
}
