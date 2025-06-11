import { PrismaClient } from "../../generated/prisma";
import select from "./const/const.selected.field";
import { CreateTaskDTO } from "./dto/dto.requestCreate";
import { UpdateRequestTaskDTO } from "./dto/dto.requestUpdate";
import { QueryListTask } from "./types/type.queryList";
import { PublicTask } from "./types/types.tasks";
import { Task } from "./types/types.tasks";

const prisma = new PrismaClient();

export class TasksService {
  async createTask(task: CreateTaskDTO): Promise<Task> {
    return prisma.task.create({
      data: {
        ...task
      },
    });
  }

async listTasks(filters?: QueryListTask): Promise<PublicTask[]> {
  const where: any = {};

  if (filters) {
    const {
      title,
      description,
      completed,
      userId,
      createdAt,
    } = filters;

    if (title) {
      where.title = { contains: title, mode: "insensitive" };
    }

    if (description) {
      where.description = { contains: description, mode: "insensitive" };
    }

    if (completed !== undefined) {
      where.completed = completed;
    }

    if (userId) {
      where.userId = userId;
    }

    if (createdAt) {
      const date = new Date(createdAt);
      if (!isNaN(date.getTime())) {
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(24, 0, 0, 0));
        where.createdAt = {
          gte: startOfDay,
          lt: endOfDay,
        };
      }
    }
  }

  return prisma.task.findMany({ where, select });
}

  async getTaskById(id: string): Promise<PublicTask | null> {
    return prisma.task.findUnique({ where: { id }, select });
  }

  async updateTask(id: string, data: UpdateRequestTaskDTO ): Promise<PublicTask> {
    return prisma.task.update({
      where: { id },
      data,
      select
    });
  }

  // Delete a task
  async deleteTask(id: string): Promise<void> {
    await prisma.task.delete({ where: { id } });
  }
}