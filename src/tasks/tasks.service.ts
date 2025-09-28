import { Get, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {


    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    //     const { title, description } = createTaskDto;
    //     const { v4: uuidv4 } = await import('uuid');
    //     const task: Task = {

    //         id: uuidv4(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);
    //     return task;  
    // }
    // getTaskById(id : string): Task | undefined {
    //     const found = this.tasks.find((task) => task.id === id)
    //     if (!found) {
    //         throw new NotFoundException(`Task with ID ${id} not found`);

    //     }
    //     return found;

    // }

    // deleteTaskById(id : string ): string {

    //     const found = this.getTaskById(id);        
    //     this.tasks = this.tasks.filter(task => task.id !== found?.id);
    //     return  `Task ${id} successfully deleted`;
    // }
    // async updateTaskStatus(id : string, status : TaskStatus) : Promise<Task | undefined > {
    //     const task = this.getTaskById(id);
    //     if (!task) {
    //         throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    //     }
    //     task.status = status;
    //     return task;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto) {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = tasks.filter(task => task.status===status)
    //     }
    //     if (search) {
    //         tasks = tasks.filter(task => 
    //             task.title.includes(search) || task.description.includes(search)
    //     );
    //     }
    //     return tasks;
    // }

}
