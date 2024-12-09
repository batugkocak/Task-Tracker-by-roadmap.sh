import { AddTaskDto, ChangeTaskStatusDto, DeleteTaskDto, ITaskService, Task, UpdateTaskDto } from "./task.interface";

export class TaskService implements ITaskService {
  tasks: Task[] = [];
  lastIndex: number = 0;

  addTask(task: AddTaskDto): Task {
    this.lastIndex++;
    const newTask: Task = {
      id: this.lastIndex,
      ...task,
      completed: false,
      isDeleted: false,
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(task: UpdateTaskDto): Task {
    const taskToUpdate = this.tasks.filter((t) => t.id == task.id)[0];

    taskToUpdate.title = task.title;
    taskToUpdate.description = task.description;
    taskToUpdate.updatedDate = new Date();

    return taskToUpdate;
  }

  deleteTask(task: DeleteTaskDto): number {
    const taskToDelete = this.tasks.filter((t) => t.id == task.id)[0];

    taskToDelete.isDeleted = true;
    taskToDelete.updatedDate = new Date();

    return task.id;
  }

  changeTaskStatus(task: ChangeTaskStatusDto): Task {
    const taskToUpdate = this.tasks.filter((t) => t.id == task.id)[0];

    taskToUpdate.completed = task.completed;
    taskToUpdate.updatedDate = new Date();

    return taskToUpdate;
  }

  getAllTasks(completed: boolean): Task[] {
    return this.tasks.filter((t) => !t.isDeleted);
  }

  getTaskById(id: number, isDeleted: boolean = false): Task | null {
    const task: Task | null = this.tasks.filter((t) => t.id == id && t.isDeleted == isDeleted)[0];
    return task;
  }
}
