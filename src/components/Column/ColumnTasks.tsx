import { Droppable } from "react-beautiful-dnd";
import React from "react";
import { useStore } from "../../store/store";
import { Task } from "../Task/Task";
import styled from "@emotion/styled";

export interface ColumnTaskProps {
  taskIds: string[];
  columnId: string;
}

export const ColumnTasks = ({ taskIds, columnId }: ColumnTaskProps) => {
  const { taskStore, dragStore } = useStore();

  const tasks = taskIds.map((taskId) => taskStore.tasks[taskId]);

  const isDroppable = dragStore.isDroppable[columnId];

  const getTaskStyle = (isDragging: boolean) => ({
    background: isDragging ? (isDroppable ? "#f5f5fa" : "red") : "none",
  });

  const Container = styled.div`
    margin-top: 8px;
  `;

  return (
    <Droppable
      isDropDisabled={!isDroppable}
      type="TASK"
      droppableId={columnId}
      key={columnId}
    >
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ ...getTaskStyle(snapshot.isDraggingOver) }}
        >
          <div>
            {tasks.map((task, index) => {
              return <Task key={task.id} task={task} index={index} />;
            })}
          </div>

          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
};
