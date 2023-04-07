import { DragStart, DragUpdate, DropResult } from "react-beautiful-dnd";
import { RulesRequest } from "../interfaces/rule";
import { Task } from "../interfaces/task";
import { useStore } from "../store/store";

export const useDragHandlers = () => {
  const { boardStore, columnStore, taskStore } = useStore();

  const board = boardStore.activeBoard;
  const { dragStore } = useStore();

  const onDragStart = ({ source, type }: DragStart) => {
    dragStore.setDroppable(source.droppableId, true);
  };

  const onDragUpdate = ({
    source,
    destination,
    type,
    draggableId,
  }: DragUpdate) => {
    if (!board || !destination) return;

    if (type === "TASK") {
      const sourceColumn = columnStore.columns.get(source.droppableId);
      const destinationColumn = columnStore.columns.get(
        destination.droppableId
      );

      if (!sourceColumn || !destinationColumn) return;

      dragStore.setDroppable(destination.droppableId, true);

      const task = taskStore.tasks[draggableId];

      if (destinationColumn.rules) {
        const rulesRequest: RulesRequest = {
          currentTasksCount: destinationColumn.taskIds.length,
          maximumTasksCount: destinationColumn.maxTasks,
          maxStoryPoints: destinationColumn.maxStoryPoints,
          currentStoryPoints: destinationColumn.taskIds.reduce((acc, id) => {
            const task = taskStore.tasks[id];
            acc += task.storyPoints;
            return acc;
          }, 0),
          currentTasks: destinationColumn.taskIds.map(
            (id) => taskStore.tasks[id]
          ),
          task,
        };

        destinationColumn.rules.forEach((rule) => {
          const { result, error } = rule(rulesRequest);
          if (!result) {
            console.log("Rule failed: ", error);
            dragStore.setDroppable(destination.droppableId, false);
          }
        });
      }
    }
  };

  const onDragEnd = ({
    source,
    destination,
    draggableId,
    type,
  }: DropResult) => {
    if (
      !board ||
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const isDragAllowed = dragStore.isDroppable[destination.droppableId];

    if (!isDragAllowed) {
      dragStore.setDroppable(destination.droppableId, true);
      return;
    }

    if (type === "COLUMN") {
      const column = columnStore.columns.get(draggableId);
      if (!column) return;

      const newColumnOrder = Array.from(board.columnIds);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(
        destination.index,
        0,
        board.columnIds[source.index]
      );

      board.columnIds = newColumnOrder;
      boardStore.updateBoard(board);

      return;
    }

    if (type === "TASK") {
      const startColumn = columnStore.columns.get(source.droppableId);
      const finishColumn = columnStore.columns.get(destination.droppableId);

      if (!startColumn || !finishColumn) return;

      if (startColumn === finishColumn) {
        const newTaskIds = Array.from(startColumn.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        columnStore.setTaskIds(startColumn.id, newTaskIds);
      } else {
        const task = taskStore.tasks[draggableId];
        if (!task) return;

        const newStartTaskIds = Array.from(startColumn.taskIds);

        task.columnId = finishColumn.id;

        const newFinishTaskIds = Array.from(finishColumn.taskIds);
        newFinishTaskIds.splice(destination.index, 0, task.id);
        newStartTaskIds.splice(source.index, 1);

        columnStore.setTaskIds(startColumn.id, newStartTaskIds);
        columnStore.setTaskIds(finishColumn.id, newFinishTaskIds);
      }
    }
  };

  return { onDragUpdate, onDragEnd, onDragStart };
};
