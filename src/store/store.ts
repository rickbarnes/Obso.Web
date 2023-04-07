import { createContext, useContext } from "react";
import ColumnStore from "./columnStore";
import UserStore from "./userStore";
import BoardStore from "./boardStore";
import TaskStore from "./taskStore";
import DragStore from "./dragStore";
interface Store {
  columnStore: ColumnStore;
  userStore: UserStore;
  boardStore: BoardStore;
  taskStore: TaskStore;
  dragStore: DragStore;
}

export const store: Store = {
  columnStore: new ColumnStore(),
  userStore: new UserStore(),
  boardStore: new BoardStore(),
  taskStore: new TaskStore(),
  dragStore: new DragStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
