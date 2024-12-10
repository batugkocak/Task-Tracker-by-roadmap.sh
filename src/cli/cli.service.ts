import { ITaskService, Task } from "../task/task.interface";
import * as readline from "readline";
import { ICLIService } from "./cli.interface";

export class CLIService implements ICLIService {
  constructor(private taskService: ITaskService) {}

  public async start(): Promise<void> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "> ",
    });

    console.log("Task CLI started. Here are the commands:");
    this.help();
    rl.prompt();

    for await (const line of rl) {
      this.clearConsole();
      const command = line.trim();
      if (command.toLowerCase() === "exit") {
        console.log("Exiting Task CLI...");
        break;
      }

      try {
        await this.executeCommand(command);
      } catch (error: any) {
        console.error(`Error: ${error.message}`);
      }

      rl.prompt();
    }

    rl.close();
  }

  private async executeCommand(command: string): Promise<void> {
    const args = this.parseArguments(command);

    const action = args.shift()?.toLowerCase();
    switch (action) {
      case "add":
        this.add(args);
        this.list([]);
        break;

      case "update":
        this.update(args);
        this.list([]);
        break;
      case "mark":
        this.markTask(args);
        this.list([]);
        break;

      case "list":
        this.list(args);
        break;

      case "delete":
        this.deleteTask(args);
        this.list([]);
        break;

      case "help":
        this.help();
        break;

      default:
        console.log(`Unknown command: ${action}. Type 'help' for a list of commands.`);
        break;
    }
  }
  private async deleteTask(args: string[]) {
    if (args.length !== 1) {
      console.log("Usage: delete <taskId>");
      return;
    }
    const taskId = parseInt(args[0], 10);
    await this.taskService.deleteTask({ id: taskId });
    console.log(`Task with ID ${taskId} deleted.`);
  }

  private async list(args: string[]) {
    if (args.length < 2) {
      const tasks = await this.taskService.getAllTasks();
      if (tasks.length === 0) {
        console.log("No tasks found.");
      } else {
        console.log("Tasks:");
        tasks.forEach((task) =>
          console.log(`- [${task.id}] ${task.title} - "${task.description}" - Completed: ${task.completed}`)
        );
      }
      return;
    }
    const completed = this.parseStringToBoolean(args[0]);
    const withDeleted = this.parseStringToBoolean(args[1]);
    const tasks = await this.taskService.getAllTasks(completed, withDeleted);
    if (tasks.length === 0) {
      console.log("No tasks found.");
    } else {
      console.log("Tasks:");
      tasks.forEach((task) => console.log(`- [${task.id}] ${task.title} - "${task.description}"`));
    }
  }
  private async help() {
    console.log("Available commands:");
    console.log("  add <title> <description>");
    console.log("    Add a new task with the given title and description.");
    console.log();
    console.log("  update <id> <title> <description>");
    console.log("    Update an existing task's title and description by its ID.");
    console.log();
    console.log("  mark <id> <status:true|false>");
    console.log("    Change the completion status of the task identified by ID.");
    console.log();
    console.log("  list [completed:true|false] [withDeleted:true|false]");
    console.log("    List all tasks. Optional filters can be applied:");
    console.log("      completed: Filter tasks by their completion status.");
    console.log("      withDeleted: Include deleted tasks in the listing.");
    console.log();
    console.log("  delete <id>");
    console.log("    Delete a task by ID.");
    console.log();
    console.log("  help");
    console.log("    Display this help menu.");
    console.log();
    console.log("  exit");
    console.log("    Exit the CLI application.");
  }

  private async add(args: string[]) {
    if (args.length < 2) {
      console.log("Usage: add <title> <description>");
      return;
    }
    const title = args[0];
    const description = args[1];
    const newTaskId = await this.taskService.addTask({ title, description }).id;
    console.log(`Task added with ID: ${newTaskId}`);
  }
  private async update(args: string[]) {
    if (args.length < 2) {
      console.log("Usage: update <id> <title> <description>");
      return;
    }
    const id = parseInt(args[0], 10);
    const title = args[1];
    const description = args[2];
    const newTaskId = await this.taskService.updateTask({ id, title, description }).id;
    console.log(`Task added with ID: ${newTaskId}`);
  }
  private async markTask(args: string[]) {
    if (args.length < 2) {
      console.log("Usage: update <id> <title> <description>");
      return;
    }
    const id = parseInt(args[0], 10);
    const completed = this.parseStringToBoolean(args[1]);
    this.taskService.changeTaskStatus({ id: id, completed: completed });
    console.log(`Task updated with ID: ${id}`);
  }
  private parseArguments(command: string): string[] {
    const regex = /"([^"]+)"|'([^']+)'|(\S+)/g;
    const matches = [];
    let match;
    while ((match = regex.exec(command)) !== null) {
      matches.push(match[1] || match[2] || match[3]);
    }
    return matches;
  }
  private parseStringToBoolean(boolean: string): boolean {
    if (boolean === "false") {
      return false;
    }
    if (boolean === "true") {
      return true;
    }
    return false;
  }
  private clearConsole(): void {
    console.clear();
  }
}
