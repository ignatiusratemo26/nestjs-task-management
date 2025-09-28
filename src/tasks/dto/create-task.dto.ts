// import { PartialType } from '@nestjs/swagger';
import { TaskStatus } from '../task.model';

export class CreateTaskDto {
    title: string;
    description: string;
}

// export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class UpdateTaskStatusDto {
    status : TaskStatus;
}