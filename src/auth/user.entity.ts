import { Task } from "src/tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany(_type => Task, task => task.user, { eager: true })
    //eager: true means that when we fetch a user, we will get the tasks as well
    tasks: Task[];
}
