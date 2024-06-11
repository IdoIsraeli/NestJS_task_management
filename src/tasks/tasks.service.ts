import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus} from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFillterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,) {}
//     getAllTasks(): Task[]{
//         return this.tasks;
//     }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne({ where: { id: id } });

        if(!found)
            throw new NotFoundException(`Task with ID "${id}" not found`);
        
        return found;
    }

//     getTaskById(id: string): Task {
//         const found = this.tasks.find((task) => task.id === id);// find the task with the id that matches the id passed in the find method and return it
//         if(!found)
//                 throw new NotFoundException();
//         return found;
//     }

//     getTasksWithFilters(filterDto : GetTasksFillterDto): Task[] {
//         const { status, search} = filterDto;
//         let tasks = this.getAllTasks();
//         if(status){
//             tasks = tasks.filter((task) => task.status == status);
//         }
//         if(search){
//             tasks = tasks.filter((task) => {
//                 if(task.title.includes(search) || task.description.includes(search)){
//                     return true;
//                 }
//                 return false;
//             })
//         }
//         return tasks;
//     }

//     deleteTask(id: string): void {
//         const found = this.getTaskById(id);
//         this.tasks = this.tasks.filter((task) => task.id !== found.id);// filter out the task with the id that matches the id passed in the filter method
//     }

//     updateTaskStatus(id: string, status: TaskStatus) {
//         const task: Task = this.getTaskById(id);
//         task.status = status;
//         return task;
//     }

//     createTask(createTaskDto: CreateTaskDto): Task{
//         const { title, description } = createTaskDto;

//         const task: Task = {
//             id: uuid(),
//             title,
//             description,
//             status: TaskStatus.OPEN,
//         };
//         this.tasks.push(task);
//         return task;
//     }
 }
