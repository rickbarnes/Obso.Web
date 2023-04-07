import { useStore } from "../../store/store";

import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Board as IBoard } from "../../interfaces/board";
import css from "./Board.module.scss";
import { Column } from "../Column/Column";
import { NewColumnButton } from "../Column/NewColumnButton";
import { useDragHandlers } from "../../applicaton/dragHandlers";
import { deepObserve } from "mobx-utils";

export interface BoardProps {
  board: IBoard;
  backgroundColor: string;
}

export const Board = ({ board }: BoardProps) => {
  const { columnStore, boardStore } = useStore();

  const [columnIds, setColumnIds] = useState([]);

  useEffect(() => {
    fetchColumns();
  }, []);

  const fetchColumns = () => {
    const newValue = boardStore.boards.get(board.id);
    if (newValue) {
      setColumnIds(newValue.columnIds);
    }
  };

  deepObserve(columnStore.columns, (change) => {});

  deepObserve(boardStore.boards, () => {
    fetchColumns();
  });

  const dragHandlers = useDragHandlers();

  const container = document.getElementById("scrollArea");

  useEffect(() => {
    const handleWheel = (e: any) => {
      if (!container) return;
      if (e.deltaY > 0) container.scrollLeft += 100;
      else container.scrollLeft -= 100;
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [container]);

  return (
    <>
      <DragDropContext
        onDragStart={dragHandlers.onDragStart}
        onDragUpdate={dragHandlers.onDragUpdate}
        onDragEnd={dragHandlers.onDragEnd}
      >
        <div
          style={{
            background: `url(${board.backgroundImageUrl}/2200x1200/) no-repeat center center fixed`,
            backgroundSize: "cover",
            transition: "background 0.5s ease",
          }}
          className={css.container}
        >
          <Droppable
            droppableId={board.id}
            type="COLUMN"
            direction="horizontal"
            ignoreContainerClipping={true}
            isCombineEnabled={false}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div id="scrollArea" className={css.content}>
                  {columnIds.map((columnId, index) => {
                    return (
                      <Draggable
                        draggableId={columnId}
                        index={index}
                        key={columnId}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ ...provided.draggableProps.style }}
                          >
                            <Droppable droppableId={columnId} type="TASK">
                              {(provided) => (
                                <div ref={provided.innerRef}>
                                  <Column columnId={columnId} index={index} />
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  <NewColumnButton />
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};
