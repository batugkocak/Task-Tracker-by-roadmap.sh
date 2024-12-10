import { Task } from "../task/task.interface";

export interface IFileService {
  readAllTasks(): Task[];

  writeAllTasks(tasks: Task[]): void;
}
