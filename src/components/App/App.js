import React, { useState } from "react";

import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles
} from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import OrderCard from "../Cards/OrderCard";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#006ba9"
    },
    error: {
      main: "#d03134"
    }
  }
});

function App() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const classes = useStyles();

  function handleClose(event, reason) {
    if (reason === "clickaway") return;
    setOpen(false);
  }

  function onToast(text) {
    setMessage(text);
    setOpen(true);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <header className="App-header">振峰订单录入系统</header>
      <OrderCard onToast={onToast} />
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <SnackbarContent
          className={classes.error}
          message={
            <span id="client-snackbar" className={classes.message}>
              {message}
            </span>
          }
        />
      </Snackbar>
    </MuiThemeProvider>
  );
}

var useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
    margin: "10px auto"
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

export default App;
