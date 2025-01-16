import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
import { NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';

const mockTaskRepository = () => ({
    findOne: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn(),
    }),
});

const mockUser = { id: 'userId', username: 'Test User' } as User;

describe('TasksService', () => {
    let tasksService: TasksService;
    let taskRepository: jest.Mocked<Repository<Task>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: getRepositoryToken(Task), useFactory: mockTaskRepository },
            ],
        }).compile();

        tasksService = module.get<TasksService>(TasksService);
        taskRepository = module.get(getRepositoryToken(Task));
    });

    describe('getTaskById', () => {
        it('calls taskRepository.findOne and successfully retrieves and returns the task', async () => {
            const mockTask = { id: 'taskId', title: 'Test task' } as Task;
            taskRepository.findOne.mockResolvedValue(mockTask);

            const result = await tasksService.getTaskById('taskId', mockUser);
            expect(result).toEqual(mockTask);
        });

        it('throws an error as task is not found', async () => {
            taskRepository.findOne.mockResolvedValue(null);
            await expect(tasksService.getTaskById('taskId', mockUser)).rejects.toThrow(NotFoundException);
        });
    });

    describe('getTasks', () => {
        it('gets all tasks from the repository', async () => {
            taskRepository.createQueryBuilder().getMany = jest.fn().mockResolvedValue('someTasks');
            const filters = { status: TaskStatus.OPEN, search: 'Some search query' };
            const result = await tasksService.getTasks(filters, mockUser);
            expect(taskRepository.createQueryBuilder).toHaveBeenCalled();
            expect(result).toEqual('someTasks');
        });
    });
});