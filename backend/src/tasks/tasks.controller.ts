import { Request, Response } from "express";
import { TasksService } from "./tasks.service";
import { CreateTaskDTO } from "./dto/dto.requestCreate";
import { UpdateRequestTaskDTO } from "./dto/dto.requestUpdate";
import { PublicTask, Task } from "./types/types.tasks";
import { QueryListTask } from "./types/type.queryList";

const tasksService = new TasksService();

export class TasksController {
  constructor() {
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const payload: CreateTaskDTO = req.body;

      if (!payload.title || !payload.userId) {
        res.status(400).json({ error: "Title and userId are required." });
        return;
      }

      const task: Task | null = await tasksService.createTask(payload);

      if (!task) {
        res.status(422).json({ error: "Task could not be created." });
        return;
      }

      res.status(201).json({ message: "Task created successfully.", data: task });
      return;
    } catch (error: any) {
      res.status(500).json({ error: "Failed to create task.", message: error });
      return;
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, completed, userId, createdAt, page } = req.query;

      if (!userId || typeof userId !== "string") {
        res.status(400).json({ error: "userId is required in query parameters." });
        return;
      }

      const payload: QueryListTask = {
        title: typeof title === "string" ? title : undefined,
        description: typeof description === "string" ? description : undefined,
        completed: typeof completed === "string" ? completed === "true" : undefined,
        userId,
        createdAt: createdAt ? new Date(createdAt as string) : undefined,
        page: page ? Number(page) : 1
      };

      const {tasks, totalCount}: { tasks: PublicTask[]; totalCount: number } = await tasksService.listTasks(payload);

      res.status(200).json({ message: "Success", data: tasks, totalCount });
      return;
    } catch (error: any) {
      res.status(500).json({ error: "Failed to retrieve tasks.", message: error });
      return;
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
        
      if(!id) {
        res.status(400).json({error: "The 'id' parameter is required to identify the task."})
      }
      const task: PublicTask | null = await tasksService.getTaskById(id);

      if (!task) {
        res.status(404).json({ error: "Task not found." });
        return;
      }

      res.status(200).json({ message: "Success.", data: task });
      return;
    } catch (error: any) {
      res.status(500).json({ error: "Failed to retrieve task.", message: error });
      return;
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const payload: UpdateRequestTaskDTO = req.body;

      const updatedTask: PublicTask = await tasksService.updateTask(id, payload);

      res.status(200).json({ message: "Task updated successfully.", data: updatedTask });
      return;
    } catch (error: any) {
      res.status(500).json({ error: "Failed to update task.", message: error });
      return;
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      await tasksService.deleteTask(id);

      res.status(200).json({ message: "Task deleted successfully." });
      return;
    } catch (error: any) {
      res.status(500).json({ error: "Failed to delete task.", message: error });
      return;
    }
  }
}