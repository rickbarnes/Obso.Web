import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store, StoreContext } from "./store/store";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initFirestorter } from "firestorter";
import makeWebContext from "firestorter/web";
import "@fontsource/saira-stencil-one";
import "@fontsource/koulen";
import "@fontsource/bebas-neue/400.css";

const app = initializeApp({
  apiKey: "AIzaSyC1eAj3MscQlrQU5qu4WQwTqAizS3DNB4o",
  projectId: "obso-d8441",
  authDomain: "obso-d8441.firebaseapp.com",
  databaseURL: "https://obso-d8441.firebaseio.com",
  storageBucket: "obso-d8441.appspot.com",
});
export const db = getFirestore(app);
initFirestorter(makeWebContext({ firestore: db }));

const theme = createTheme({
  palette: {
    text: {
      primary: "#2d3748",
    },
    primary: {
      main: "#2d3748",
      contrastText: "#fff",
    },
    info: {
      main: "#fff",
    },
    contrastThreshold: 3,
  },
  typography: {
    fontFamily: ["sans-serif"].join(","),
    h3: {
      fontFamily: ["Saira Stencil One"].join(","),
    },
    h6: {
      fontFamily: ["Bebas Neue"].join(","),
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StoreContext.Provider>
);
