// src/tasks/dto/ListTasksQueryDTO.ts
import { IsOptional, IsString, IsBoolean, IsDateString } from "class-validator";

export class ListTasksQueryDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsString()
  userId!: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
