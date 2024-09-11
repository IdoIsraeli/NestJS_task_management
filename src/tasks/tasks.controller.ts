import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service'; // Import the 'TasksService' class from the appropriate module
import { TaskStatus } from './task-status.enum'; // Import the 'Task' class from the appropriate module
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFillterDto } from './dto/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')// This decorator defines the controller's base route
@UseGuards(AuthGuard()) // This decorator applies the 'AuthGuard' guard to the controller
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTasksFillterDto,
        @GetUser() user: User
    ): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto, user);
    }


    @Get('/:id')
    getTaskById(@Param('id') id: string,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string,
        @GetUser() user: User): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }

    @Post()
    createTask(@Body() CreateTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.createTask(CreateTaskDto, user); // Call the 'createTask' method from the 'TasksService' class
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: updateTaskStatusDto,
        @GetUser() user: User
    ): Promise<Task> {
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status, user);
    }
}
