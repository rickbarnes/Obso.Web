import { useStore } from "../store/store";
import { app } from "./firebaseService";

const transferData = async () => {
  const { boardStore } = useStore();

  boardStore.boards.forEach(async (board) => {
    console.log(board);
  });
};
