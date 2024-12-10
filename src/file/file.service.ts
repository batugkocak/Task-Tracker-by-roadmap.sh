import { Task } from "../task/task.interface";
import { IFileService } from "./file.interface";

import fs from "fs";
import path from "path";

export class FileService implements IFileService {
  constructor(private filePath: string) {
    this.filePath = path.resolve(__dirname, filePath);

    let pathExists = fs.existsSync(this.filePath);

    if (!pathExists) {
      fs.writeFileSync(this.filePath, "");
    }
  }

  readAllTasks(): Task[] {
    const fileContent = fs.readFileSync(this.filePath, "utf8");
    if (fileContent == "") {
      console.log("There is no tasks in the file!");
      return [];
    }
    const tasks: Task[] = JSON.parse(fileContent);
    return tasks;
  }
  writeAllTasks(tasks: Task[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(tasks));
  }
  private initialize(): void {
    if (!fs.existsSync(this.filePath)) {
    }
  }
}
