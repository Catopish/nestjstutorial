import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  delTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  patchTaskByid(id: string, status: TaskStatus) {
    const obj = this.getTaskById(id);
    obj.status = status;
    return obj;
  }

  createTask(createTaskDTO: createTaskDto): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
