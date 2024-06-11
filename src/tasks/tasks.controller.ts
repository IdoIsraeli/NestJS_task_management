import { Body, Controller, Get, Post, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service'; // Import the 'TasksService' class from the appropriate module
import { TaskStatus } from './task-status.enum'; // Import the 'Task' class from the appropriate module
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFillterDto } from './dto/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')// This decorator defines the controller's base route
export class TasksController {
    constructor(private tasksService: TasksService) {}

//     @Get()
//     getTasks(@Query() filterDto: GetTasksFillterDto): Task[]{
//         if(Object.keys(filterDto).length){
//             return this.tasksService.getTasksWithFilters(filterDto);
//         } else{
//             return this.tasksService.getAllTasks();// Call the 'getAllTasks' method from the 'TasksService' class
//         }
//     }


    @Get(':id')
     getTaskById(@Param('id') id: string): Promise<Task> {
         return this.tasksService.getTaskById(id);
     }

//     @Delete(':id')
//     deleteTask(@Param('id') id: string): void {
//         this.tasksService.deleteTask(id);
//     }

//     @Post()
//     createTask(@Body() CreateTaskDto: CreateTaskDto): Task{
//         return this.tasksService.createTask(CreateTaskDto); // Call the 'createTask' method from the 'TasksService' class
//     }

//     @Patch('/:id/status')
//     updateTaskStatus(
//         @Param('id') id: string,
//         @Body()updateTaskStatusDto: updateTaskStatusDto,
//     ): Task {
//         const { status } = updateTaskStatusDto;
//         return this.tasksService.updateTaskStatus(id, status);
//     }
    }
