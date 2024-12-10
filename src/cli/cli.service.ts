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

    console.log("Task CLI started. Type 'help' for commands or 'exit' to quit.");
    rl.prompt();

    for await (const line of rl) {
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
        if (args.length < 2) {
          console.log("Usage: add <title> <description>");
          return;
        }
        const title = args[0];
        const description = args[1];
        const newTaskId = await this.taskService.addTask({ title, description });
        console.log(`Task added with ID: ${newTaskId}`);
        break;

      case "list":
        const tasks = await this.taskService.getAllTasks(false, false);
        if (tasks.length === 0) {
          console.log("No tasks found.");
        } else {
          console.log("Tasks:");
          tasks.forEach((task) => console.log(`- [${task.id}] ${task.title}`));
        }
        break;

      case "delete":
        if (args.length !== 1) {
          console.log("Usage: delete <taskId>");
          return;
        }
        const taskId = parseInt(args[0], 10);
        await this.taskService.deleteTask({ id: taskId });
        console.log(`Task with ID ${taskId} deleted.`);
        break;

      case "help":
        console.log("Available commands:");
        console.log("  add <title> <description> - Add a new task");
        console.log("  list - List all tasks");
        console.log("  delete <taskId> - Delete a task by ID");
        console.log("  exit - Exit the CLI");
        break;

      default:
        console.log(`Unknown command: ${action}. Type 'help' for a list of commands.`);
        break;
    }
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
}
