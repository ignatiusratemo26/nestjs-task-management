import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    async getAllTasks(): Promise<Task[]> {
        return await this.tasksService.getAllTasks();
    }

    @Post()
    async createTask(@Body() body : { title: string, description: string}): Promise<Task> {
        return await this.tasksService.createTask(body.title, body.description);
    }
}
