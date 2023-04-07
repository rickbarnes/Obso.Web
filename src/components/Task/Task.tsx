import { Box, Card, Chip, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Task as ITask } from "../../interfaces/task";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import css from "./Task.module.scss";

export interface TaskProps {
  task: ITask;
  index: number;
}

export const Task = ({ task, index }: TaskProps) => {
  const [hover, setHover] = useState(false);

  const getStoryPointsColor = (storyPoints: number) => {
    let color = "black";
    switch (storyPoints) {
      case 1:
        return "success";
      case 2:
        return "info";
      case 3:
        return "warning";
      case 5:
        return "error";
    }
  };

  const getItemStyle = (isDragging: boolean) => ({
    background: isDragging ? "#e4f7ec" : hover ? "#fafafa" : "white",
    borderWidth: isDragging ? "thick" : 0,
  });
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card
            className={css.card}
            style={{
              ...getItemStyle(snapshot.isDragging),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className={css.header}>
              <div className={css.title}>
                <Typography variant="body2">{task.title}</Typography>
              </div>
              {hover && (
                <div className={css.editButton}>
                  <IconButton size="small">
                    <MoreHorizIcon />
                  </IconButton>
                </div>
              )}
            </div>
            <div className={css.body}>
              {task.storyPoints && (
                <div className={css["story-points"]}>
                  <Chip
                    label={task.storyPoints}
                    color={getStoryPointsColor(task.storyPoints)}
                    variant="outlined"
                    size="small"
                  />
                </div>
              )}
            </div>
            <div className="footer"></div>
            {/* <Box sx={{ m: 1 }}>
              <Grid container>
                <Grid item xs={10}>
                  {task.title}
                </Grid>
                <Grid hidden={!hover} item xs={1}>
                  <IconButton>
                    <MoreHorizIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box> */}
          </Card>
        </div>
      )}
    </Draggable>
  );
};
