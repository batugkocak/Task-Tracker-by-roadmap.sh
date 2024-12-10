import { CLIService } from "./cli/cli.service";
import { FileService } from "./file/file.service";
import { TaskService } from "./task/task.service";

import fs from "fs/promises";
import path from "path";

(async () => {
  const fileService = new FileService("tasks.json");
  await fileService.initialize();

  const taskService = new TaskService(fileService);
  const cliService = new CLIService(taskService);
  cliService.start();
})();
