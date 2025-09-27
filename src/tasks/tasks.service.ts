import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const { v4: uuidv4 } = await import('uuid');
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;  
    }
    getTaskById(id : string): Task | undefined {
        return this.tasks.find((task) => task.id === id)

    }

    deleteTaskById(id : string ): string {
        this.tasks = this.tasks.filter(task => task.id !== id);
        return `Task ${id} successfully deleted`;
    }

}
