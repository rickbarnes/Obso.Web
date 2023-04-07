import {
  Box,
  ButtonGroup,
  Grid,
  Grow,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ColumnTasks } from "./ColumnTasks";
import { Column as IColumn } from "../../interfaces/column";
import { useStore } from "../../store/store";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { NewTaskButton } from "../Task/NewTaskButton";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
export interface ColumnProps {
  columnId: string;
  index: number;
}

export const Column = ({ columnId, index }: ColumnProps) => {
  const { columnStore } = useStore();
  const column = columnStore.columns.get(columnId);
  if (!column) return null;

  const [showEditButton, setShowEditButton] = useState(false);
  const [editing, setEditing] = useState(false);
  const [headerText, setHeaderText] = useState(column.header);

  const saveEdit = () => {
    column.header = headerText;
    columnStore.updateColumn(column.id, column);
    setEditing(false);
  };

  const cancelEdit = () => {
    setHeaderText(column.header);
    setEditing(false);
  };

  const getColumnStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "#dae9f7" : "#EDF2F7",
  });

  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {(provided: DraggableProvided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getColumnStyle(snapshot.isDropAnimating)}
          >
            <Paper
              sx={{
                minHeight: 40,
                width: 250,
                bgcolor: "#EDF2F7",
                ...getColumnStyle(snapshot.isDragging),
              }}
              elevation={5}
              onMouseEnter={() => setShowEditButton(true)}
              onMouseLeave={() => setShowEditButton(false)}
            >
              <Grow in={true} timeout={500}>
                <Box sx={{ m: 1, paddingBottom: 2 }}>
                  <Grid sx={{ p: 1 }} container>
                    <Grid item xs={editing ? 10 : 11}>
                      {editing ? (
                        <TextField
                          variant="standard"
                          onChange={(e) => setHeaderText(e.target.value)}
                          defaultValue={column.header}
                        />
                      ) : (
                        <Typography variant="h6">{column.header}</Typography>
                      )}
                    </Grid>
                    <Grid hidden={!showEditButton} item xs={editing ? 2 : 1}>
                      {" "}
                      {!editing ? (
                        <IconButton
                          size="small"
                          onClick={() => setEditing(!editing)}
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                      ) : (
                        <>
                          <ButtonGroup>
                            <IconButton size="small" onClick={() => saveEdit()}>
                              <CheckIcon color="success" fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => cancelEdit()}
                            >
                              <CloseIcon color="error" fontSize="small" />
                            </IconButton>
                          </ButtonGroup>
                        </>
                      )}
                    </Grid>
                  </Grid>
                  <ColumnTasks columnId={column.id} taskIds={column.taskIds} />

                  <Grid hidden={!showEditButton} item sx={{ m: 1 }}>
                    <NewTaskButton parentId={column.id} />
                  </Grid>
                </Box>
              </Grow>
            </Paper>
          </div>
        )}
      </Draggable>
    </>
  );
};
