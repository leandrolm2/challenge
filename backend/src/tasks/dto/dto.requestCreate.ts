import { IsString, IsOptional, IsBoolean, MinLength } from "class-validator";

export class CreateTaskDTO {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  @IsOptional()
  description?: string | undefined;

  @IsBoolean()
  @IsOptional()
  completed?: boolean | undefined;

  @IsString()
  userId!: string;
}