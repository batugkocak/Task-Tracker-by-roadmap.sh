export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  isDeleted: boolean;
  createdDate: Date;
  updatedDate: Date;
}

export interface AddTaskDto {
  title: string;
  description: string;
}

export interface UpdateTaskDto {
  id: number;
  title: string;
  description: string;
}

export interface DeleteTaskDto {
  id: number;
}
export interface ChangeTaskStatusDto {
  id: number;
  completed: boolean;
}

export interface ITaskService {
  addTask(task: AddTaskDto): Task;
  updateTask(task: UpdateTaskDto): Task;
  deleteTask(task: DeleteTaskDto): number;
  changeTaskStatus(task: ChangeTaskStatusDto): Task;
  getAllTasks(completed: boolean, withDeleted: boolean): Task[];
  getTaskById(id: number, isDeleted: boolean): Task | null;
}
