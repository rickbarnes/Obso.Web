import { RestrictOneTaskPerUser } from "./../applicaton/columnRules";
import { action, makeObservable, observable } from "mobx";
import { Column } from "../interfaces/column";
import { v4 as uuidv4 } from "uuid";
import { deepObserve } from "mobx-utils";

export default class ColumnStore {
  columns = new Map<string, Column>([
    [
      "ed63adb7-1a01-40ef-ac03-73ee25cf72e0",
      {
        id: "ed63adb7-1a01-40ef-ac03-73ee25cf72e0",
        header: "Todo",
        taskIds: [],
        isEditing: false,
      },
    ],
    [
      "c51f2588-2c17-40a0-833e-c359e8ae9a01",
      {
        id: "c51f2588-2c17-40a0-833e-c359e8ae9a01",
        header: "In Progress",
        taskIds: [],
        isEditing: false,
        rules: [RestrictOneTaskPerUser],
        maxTasks: 1,
      },
    ],
  ]);

  constructor() {
    makeObservable(this, {
      columns: observable,
      addColumn: action,
      fetchColumnsByBoardId: action,
      updateColumn: action,
      setTaskIds: action,
      addTask: action,
    });
  }

  addColumn = (column: Column) => {
    this.columns.set(column.id, column);
  };

  fetchColumnsByBoardId = async (boardId: string) => {
    const column: Column = {
      id: uuidv4(),
      header: "New Column",
      taskIds: [],
      isEditing: true,
    };
    return new Promise((resolve) => {
      resolve(this.columns.values);
    });
  };

  updateColumn = (id: string, column: Column) => {
    this.columns[id] = column;
  };

  setTaskIds = (columnId: string, taskIds: string[]) => {
    const column = this.columns.get(columnId);
    if (column) {
      const newColumn = { ...column, taskIds };
      this.columns.set(columnId, newColumn);
    }
  };

  addTask = (columnId: string, taskId: string) => {
    const column = this.columns.get(columnId);
    if (column) {
      const newTasks = Array.from(column.taskIds);
      newTasks.push(taskId);
      const newColumn = { ...column, taskIds: newTasks };
      this.columns.set(columnId, newColumn);
    }
  };
}
