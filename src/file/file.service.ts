import { Task } from "../task/task.interface";
import { IFileService } from "./file.interface";

import fs from "fs";

export class FileService implements IFileService {
  constructor(private filePath: string) {}

  readAllTasks(): Task[] {
    const fileContent = fs.readFileSync("./src/data/tasks.json", "utf8");
    if (fileContent == "") {
      console.log("There is no tasks in the file!");
      return [];
    }
    const tasks: Task[] = JSON.parse(fileContent);
    return tasks;
  }
  writeAllTasks(tasks: Task[]): void {
    fs.writeFileSync("./src/data/tasks.json", JSON.stringify(tasks));
  }
  private initialize(): void {
    if (!fs.existsSync(this.filePath)) {
    }
  }
}
