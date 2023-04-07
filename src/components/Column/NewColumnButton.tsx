import { Paper, Box, Typography } from "@mui/material";
import { Column as IColumn } from "../../interfaces/column";
import { useStore } from "../../store/store";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import React from "react";

export const NewColumnButton = () => {
  const [hover, setHover] = useState(false);
  const { columnStore, boardStore } = useStore();
  const addNewColumn = async () => {
    const board = boardStore.activeBoard;
    if (!board) return;

    const column: IColumn = {
      taskIds: [],
      id: uuidv4(),
      header: "New Column",
      isEditing: true,
    };

    const newBoard = {
      ...board,
      columnIds: [...board.columnIds, column.id],
    };

    await columnStore.addColumn(column);
    await boardStore.addColumn(board.id, column.id);
  };

  return (
    <Paper
      onClick={async () => await addNewColumn()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        width: 140,
        bgcolor: hover ? "#c7ced6" : "#CBD5E0",
        opacity: 0.8,
        cursor: "pointer",
        marginTop: 1,
        maxHeight: 55,
        flex: "0 0 auto",
      }}
      elevation={5}
    >
      <Box sx={{ m: 1, p: 1 }}>
        <Typography variant="body2">+ Add Column</Typography>
      </Box>
    </Paper>
  );
};
