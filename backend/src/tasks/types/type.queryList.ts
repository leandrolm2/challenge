export type QueryListTask = {
  title?: string;
  description?: string;
  completed?: boolean;
  userId: string;
  createdAt?: Date | string;
};