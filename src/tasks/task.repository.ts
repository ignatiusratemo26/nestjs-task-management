import { Repository, DataSource } from "typeorm";
import { Task } from "./task.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from "./task-status.enum";
import { NotFoundError } from "rxjs";


@Injectable()
export class TaskRepository {

    private repository: Repository<Task>;

    constructor(private dataSource: DataSource ) {
        // telling the Repository (parent) to manage the Task entity using this db connection
        this.repository = this.dataSource.getRepository(Task);
    }


    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.repository.create({
            title,
            description,
            status: TaskStatus.OPEN
        });
        await this.repository.save(task);
        return task;
    }

    async getTasks(): Promise<Task[]> {
        return this.repository.find();
    }

    async findOne(options: any): Promise<Task | null > {
        return this.repository.findOne(options);
    }
} 