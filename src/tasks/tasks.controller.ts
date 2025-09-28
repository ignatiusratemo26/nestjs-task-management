import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    async getAllTasks(): Promise<Task[]> {
        return await this.tasksService.getAllTasks();
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string): Promise<Task | undefined> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }
    @Delete('/:id')
    async deleteTaskById(@Param('id') id : string): Promise<string> {
        
        return this.tasksService.deleteTaskById(id);
    }
    @Patch('/:id/status')
    async updateTask(@Param('id') id: string, @Body('status') status: TaskStatus ): Promise<Task | undefined > {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
