import { Task } from "../task/task.interface";
import { IFileService } from "./file.interface";

import fs from "fs/promises";
import path from "path";

export class FileService implements IFileService {
  private filePath: string;
  private baseDir: string;

  constructor(private fileName: string) {
    this.baseDir = path.resolve(__dirname, "../data");
    this.filePath = path.resolve(this.baseDir, fileName);
  }

  async readAllTasks(): Promise<Task[]> {
    try {
      const fileContent = await fs.readFile(this.filePath, "utf8");
      return fileContent === "[]" ? [] : JSON.parse(fileContent);
    } catch (error) {
      console.error(`Failed to read file at ${this.filePath}:`, error);
      return [];
    }
  }

  async writeAllTasks(tasks: Task[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(tasks, null, 2));
    } catch (error) {
      console.error(`Failed to write to file at ${this.filePath}:`, error);
    }
  }

  private async ensureFolderExists(): Promise<void> {
    try {
      const stats = await fs.stat(this.baseDir);
      if (!stats.isDirectory()) {
        throw new Error("Not a directory");
      }
    } catch {
      await fs.mkdir(this.baseDir, { recursive: true });
    }
  }

  private async ensureFileExists(): Promise<void> {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, JSON.stringify([], null, 2));
    }
  }

  async initialize(): Promise<void> {
    try {
      await this.ensureFolderExists();
      await this.ensureFileExists();
      console.log("Initialization complete.");
    } catch (error) {
      console.error("Failed to initialize file service:", error);
    }
  }
}
