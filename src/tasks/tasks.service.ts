import { Injectable, NotFoundException } from '@nestjs/common';
// import { TaskStatus } from './task-status.enum';
import { createTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }

  createTask(createTaskDTO: createTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO);
  }

  async delTaskById(id: string): Promise<void> {
    const deleted = await this.tasksRepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException(`Task with ${id} not deleted`);
    }
  }
  async patchTaskByid(id: string, status: TaskStatus): Promise<Task> {
    const obj = await this.getTaskById(id);
    obj.status = status;
    await this.tasksRepository.save(obj);
    return obj;
  }
  // getTaskByFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   }
  //   return tasks;
  // }
  //
  //
  //
}
