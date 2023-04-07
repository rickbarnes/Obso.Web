import { action, observable } from "mobx";
import { makeObservable } from "mobx";
import { Board } from "../interfaces/board";

export default class BoardStore {
  boards = new Map<string, Board>([
    [
      "eace8221-735b-4154-87cc-6d90343fc254",
      {
        id: "eace8221-735b-4154-87cc-6d90343fc254",
        name: "Daily",
        backgroundImageUrl: "https://source.unsplash.com/9wg5jCEPBsw",
        columnIds: [
          "ed63adb7-1a01-40ef-ac03-73ee25cf72e0",
          "c51f2588-2c17-40a0-833e-c359e8ae9a01",
        ],
        backgroundType: 1,
        backgroundColor: "#f5f5f5",
        ownerId: "HgwAK5O0nVN3u351zdtirsqKPhF2",
        userIds: ["HgwAK5O0nVN3u351zdtirsqKPhF2"],
      },
    ],
    [
      "eace8221-735b-4154-87cc-6d90343fc255",
      {
        id: "eace8221-735b-4154-87cc-6d90343fc255",
        name: "Board 2",
        backgroundImageUrl: "https://source.unsplash.com/g30P1zcOzXo",
        backgroundType: 1,
        columnIds: [],
        backgroundColor: "#f5f5f5",
        ownerId: "HgwAK5O0nVN3u351zdtirsqKPhF2",
        userIds: ["HgwAK5O0nVN3u351zdtirsqKPhF2"],
      },
    ],
  ]);

  // {
  //   id: "eace8221-735b-4154-87cc-6d90343fc256",
  //   name: "Board 3",
  //   backgroundImageUrl: "https://source.unsplash.com/Bkci_8qcdvQ",
  // },
  // {
  //   id: "eace8221-735b-4154-87cc-6d90343fc257",
  //   name: "Board 4",
  //   backgroundImageUrl: "https://source.unsplash.com/phIFdC6lA4E",
  // },
  // {
  //   id: "eace8221-735b-4154-87cc-6d90343fc258",
  //   name: "SQL",
  //   backgroundImageUrl: "https://source.unsplash.com/ir5gC4hlqT0",
  // },
  // {
  //   id: "eace8221-735b-4154-87cc-6d90343fc259",
  //   name: "Algorithmic Trading",
  //   backgroundImageUrl: "https://source.unsplash.com/WyxqQpyFNk8",
  // },

  activeBoard = {} as Board | null;

  constructor() {
    makeObservable(this, {
      boards: observable,
      fetchBoards: action,
      activeBoard: observable,
      setActiveBoard: action,
      addColumn: action,
    });
  }

  fetchBoards = (userId: string) => {
    this.boards = new Map();
  };

  setActiveBoard = (boardId: string | null) => {
    if (boardId === null) {
      this.activeBoard = null;
      return;
    }
    const board = this.boards.get(boardId);
    if (!board) return;
    this.activeBoard = board;
  };

  updateBoard = (board: Board) => {
    const existing = this.boards.get(board.id);
    if (!existing) return;

    this.boards.set(board.id, board);
  };

  addColumn = (boardId: string, columnId: string) => {
    const board = this.boards.get(boardId);

    if (!board) return;

    let newColumns = Array.from(board.columnIds);
    newColumns = [...newColumns, columnId];

    const newBoard = {
      ...board,
      columnIds: newColumns,
    };

    this.boards.set(boardId, newBoard);
  };
}
