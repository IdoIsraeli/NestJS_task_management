import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFillterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,) { }


    async getTaskById(id): Promise<Task> {
        const found = await this.taskRepository.findOneBy({ id: id });
        if (!found)
            throw new NotFoundException(`Task with id "${id}" is not found`);
        return found;
    }


    async getTasks(filterDto: GetTasksFillterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.taskRepository.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', { status })
        }

        if (search) {
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', { search: `%${search}%` }
            )
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async deleteTask(id: string): Promise<void> {
        const res = await this.taskRepository.delete(id);

        if (res.affected === 0) {
            throw new NotFoundException(`Task with id "${id}" is not found`);
        }
    }


    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);

        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }


    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
        })

        await this.taskRepository.save(task);
        return task;
    }
}
