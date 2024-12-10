import { Task } from "../task/task.interface";

export interface ICLIService {
  start(): Promise<void>;
}
