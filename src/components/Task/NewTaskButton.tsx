import { Button, ButtonGroup, TextField } from "@mui/material";
import { useState } from "react";
import { Task } from "../../interfaces/task";
import { useStore } from "../../store/store";
import css from "./NewTaskButton.module.scss";
import { v4 as uuidv4 } from "uuid";

interface NewTaskButtonProps {
  parentId: string;
}

export const NewTaskButton = ({ parentId }: NewTaskButtonProps) => {
  const storyPoints = [1, 2, 3, 5];
  const [adding, setAdding] = useState(false);
  const { taskStore, columnStore } = useStore();
  const [header, setHeader] = useState("");
  const addItem = async () => {
    const randomStoryPoint =
      storyPoints[Math.floor(Math.random() * storyPoints.length)];
    const task: Task = {
      id: uuidv4(),
      title: header || "New Card",
      columnId: parentId,
      creatorId: "1",
      storyPoints: randomStoryPoint,
    };
    await taskStore.addTask(task);

    await columnStore.addTask(parentId, task.id);
    setHeader("");
  };

  const keyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  return (
    <>
      <div className={css.addItemButton}>
        {adding ? (
          <>
            <TextField
              style={{ backgroundColor: "white" }}
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              placeholder="New Card Title"
              onKeyDown={(e) => keyPress(e)}
            />
            <ButtonGroup sx={{ pt: 1 }}>
              <Button onClick={() => addItem()}>Add Item</Button>
              <Button onClick={() => setAdding(false)}>Cancel</Button>
            </ButtonGroup>
          </>
        ) : (
          <Button onClick={() => setAdding(true)}>Add Item</Button>
        )}
      </div>
    </>
  );
};
