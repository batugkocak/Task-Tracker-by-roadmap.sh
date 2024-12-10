import { FileService } from "../file/file.service";
import { AddTaskDto, ChangeTaskStatusDto, DeleteTaskDto, ITaskService, Task, UpdateTaskDto } from "./task.interface";

export class TaskService implements ITaskService {
  private tasks: Task[] = [];

  constructor(private fileService: FileService) {
    this.initalizeTasks();
  }

  addTask(task: AddTaskDto): Task {
    this.initalizeTasks();
    const newTask: Task = {
      id: this.generateID(),
      ...task,
      completed: false,
      isDeleted: false,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    this.tasks.push(newTask);
    this.fileService.writeAllTasks(this.tasks);
    return newTask;
  }

  updateTask(task: UpdateTaskDto): Task {
    this.initalizeTasks();
    const taskToUpdate = this.tasks.find((t) => t.id === task.id);

    if (!taskToUpdate) {
      throw new Error(`Task with id ${task.id} not found`);
    }

    taskToUpdate.title = task.title;
    taskToUpdate.description = task.description;
    taskToUpdate.updatedDate = new Date();

    this.fileService.writeAllTasks(this.tasks);

    return taskToUpdate;
  }

  deleteTask(task: DeleteTaskDto): number {
    this.initalizeTasks();
    const taskToDelete = this.tasks.find((t) => t.id === task.id);

    if (!taskToDelete) {
      throw new Error(`Task with id ${task.id} not found`);
    }

    taskToDelete.isDeleted = true;
    taskToDelete.updatedDate = new Date();

    this.fileService.writeAllTasks(this.tasks);
    return task.id;
  }

  changeTaskStatus(task: ChangeTaskStatusDto): Task {
    this.initalizeTasks();
    const taskToUpdate = this.tasks.find((t) => t.id === task.id);

    if (!taskToUpdate) {
      throw new Error(`Task with id ${task.id} not found`);
    }

    taskToUpdate.completed = task.completed;
    taskToUpdate.updatedDate = new Date();

    this.fileService.writeAllTasks(this.tasks);
    return taskToUpdate;
  }

  getAllTasks(completed?: boolean, withDeleted: boolean = false): Task[] {
    this.initalizeTasks();
    const filteredTasks = withDeleted ? this.tasks : this.tasks.filter((t) => !t.isDeleted);

    if (completed === undefined) {
      return filteredTasks;
    }

    return filteredTasks.filter((t) => t.completed === completed);
  }

  getTaskById(id: number, isDeleted: boolean = false): Task | null {
    this.initalizeTasks();
    return this.tasks.find((t) => t.id === id && t.isDeleted === isDeleted) || null;
  }

  private generateID(): number {
    const maxId = this.tasks.length ? Math.max(...this.tasks.map((t) => t.id)) : 0;
    return maxId + 1;
  }

  private initalizeTasks(): void {
    this.tasks = this.fileService.readAllTasks();
  }
}
