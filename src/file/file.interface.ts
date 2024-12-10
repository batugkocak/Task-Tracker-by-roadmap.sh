import { Task } from "../task/task.interface";

export interface IFileService {
  readAllTasks(): Promise<Task[]>;

  writeAllTasks(tasks: Task[]): Promise<void>;
}
