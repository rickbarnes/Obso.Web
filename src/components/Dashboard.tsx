import { Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { Login } from "./Login";

import "../styles/globals.scss";
import { BoardIndex } from "./Board/BoardIndex";

export const Dashboard = observer(() => {
  const { userStore } = useStore();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      userStore.setUser(user);
    }
  }, []);

  return <>{userStore.loggedIn === false ? <Login /> : <BoardIndex />}</>;
});
