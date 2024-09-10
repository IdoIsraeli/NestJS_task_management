import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service'; // Import the 'TasksService' class from the appropriate module
import { TaskStatus } from './task-status.enum'; // Import the 'Task' class from the appropriate module
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFillterDto } from './dto/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')// This decorator defines the controller's base route
@UseGuards(AuthGuard()) // This decorator applies the 'AuthGuard' guard to the controller
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTasksFillterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    }


    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    @Post()
    createTask(@Body() CreateTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(CreateTaskDto); // Call the 'createTask' method from the 'TasksService' class
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: updateTaskStatusDto,
    ): Promise<Task> {
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status);
    }
}
