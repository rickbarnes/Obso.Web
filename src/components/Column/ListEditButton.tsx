import { ActionTypes } from "@mui/base";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

interface ListEditButtonProps {
  hidden: boolean;
}

export const ListEditButton = ({ hidden }: ListEditButtonProps) => {
  const actions = [{ icon: <EditIcon />, name: "Edit" }];
  return (
    <SpeedDial
      icon={<SpeedDialIcon />}
      direction="up"
      ariaLabel="Edit"
      hidden={hidden}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
};
