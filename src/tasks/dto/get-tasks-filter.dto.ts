import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class GetTasksFillterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus; // the '?' means that these are optional

    @IsOptional()
    @IsString()
    search?: string;
}