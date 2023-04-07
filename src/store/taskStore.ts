import { action, makeObservable, observable } from "mobx";
import { Task } from "../interfaces/task";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "./store";

export default class TaskStore {
  tasks: { [id: string]: Task } = {};

  constructor() {
    makeObservable(this, {
      tasks: observable,
      addTask: action,
      fetchTasksByColumnId: action,
    });
  }

  addTask = async (task: Task): Promise<void> => {
    return new Promise((resolve) => {
      this.tasks[task.id] = task;
      resolve();
    });
  };

  fetchTasksByColumnId = (columnId: string) =>
    Object.values(this.tasks).filter((t: Task) => t.columnId === columnId);

  fetchSubTasksByParentId = async (parentId: string): Promise<Task[]> => {
    const randomNumCards = Math.floor(Math.random() * 4);
    const subTasks: Task[] = [];

    for (let i = 0; i < randomNumCards; i++) {
      const task: Task = {
        title: `Task ${i + 2}`,
        id: uuidv4(),
        columnId: parentId,
        creatorId: "1",
        assigneeId: null,
      };

      this.addTask(task);
      subTasks.push(task);
    }

    return subTasks;
  };
}
