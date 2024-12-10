import { CLIService } from "./cli/cli.service";
import { FileService } from "./file/file.service";
import { TaskService } from "./task/task.service";

const fileService = new FileService("./src/data/tasks.json");
const taskService = new TaskService(fileService);
const cliService = new CLIService(taskService);

cliService.start();
