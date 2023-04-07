import { makeAutoObservable } from "mobx";
export default class DragStore {
  isDroppable: { [id: string]: boolean } = {};

  construct() {
    makeAutoObservable(this);
  }

  setDroppable = (id: string, isDroppable: boolean) => {
    this.isDroppable[id] = isDroppable;
  };
}
