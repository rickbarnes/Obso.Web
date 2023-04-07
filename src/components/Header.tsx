import { observer } from "mobx-react-lite";
import React from "react";

import css from "./Header.module.scss";
import logo from "../logo.svg";
import { Avatar, Button, Typography } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useStore } from "../store/store";

interface HeaderProps {
  color?: string;
}

export const Header = observer(({ color }: HeaderProps) => {
  const { userStore, boardStore } = useStore();

  return (
    <>
      <div style={{ backgroundColor: color }} className={css.header}>
        <div
          onClick={() => boardStore.setActiveBoard(null)}
          className={css.logo}
        >
          <img src={logo} alt="logo" />
          <Typography variant="h3" color="white">
            Obso
          </Typography>
        </div>
        <div className={css.buttons}>
          <Avatar
            onClick={() => userStore.logOut()}
            className={css.avatar}
            src={userStore.user.avatarUrl ?? undefined}
          />
        </div>
      </div>
    </>
  );
});
