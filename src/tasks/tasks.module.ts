import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository])], // this is where we import other modules
  controllers: [TasksController],
  providers: [TasksService], // this allows to inject the service into the controller
})
export class TasksModule {}
