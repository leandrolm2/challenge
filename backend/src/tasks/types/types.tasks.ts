export type Task = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  totalCount?: number;
};

export type PublicTask = Omit<Task, "updatedAt" | "userId">;

