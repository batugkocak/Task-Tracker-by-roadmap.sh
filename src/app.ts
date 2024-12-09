import { TaskService } from "./task/task.service";

const taskService = new TaskService();

taskService.addTask({ title: "Test", description: "I am testing this service" });
taskService.addTask({ title: "Test", description: "I am testing this service" });
taskService.addTask({ title: "Test", description: "I am testing this service" });
taskService.addTask({ title: "Test", description: "I am testing this service" });

taskService.updateTask({ id: 2, title: "Updated Title", description: "I am updating this task!" });
taskService.updateTask({ id: 4, title: "Updated Title 2", description: "I am updating this task too!" });
taskService.deleteTask({ id: 3 });

console.log(taskService.getAllTasks(false));

console.log(taskService.getTaskById(3));
console.log(taskService.getTaskById(3, true));
