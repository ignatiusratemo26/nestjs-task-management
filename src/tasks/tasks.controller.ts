import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    async getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[] | undefined> {
        if (Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        } 
        else return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string): Promise<Task | undefined> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }
    @Delete('/:id')
    async deleteTaskById(@Param('id') id : string): Promise<string> {
        
        return this.tasksService.deleteTaskById(id);
    }
    @Patch('/:id/status')
    async updateTask(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus ): Promise<Task | undefined > {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
