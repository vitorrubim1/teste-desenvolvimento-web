import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";

import ListCard from "./components/ListCard";
import Pokemon from "./components/Pokemon";

function App() {
  const [darkTheme, setDarkTheme] = React.useState(false);

  const theme = createMuiTheme({
    //object theme
    palette: {
      type: darkTheme ? "dark" : "light",
      primary: {
        main: "#1552e2",
      },
      secondary: {
        main: darkTheme ? "#66a3ff" : "#1552e2",
      },
      background: {
        default: darkTheme ? "#232323" : "#FFF",
        dark: darkTheme ? "#181818" : "#f4f6f8",
        paper: darkTheme ? "#232323" : "#232323",
      },
    },
  });

  return (
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Switch>
          <ListCard
            exact
            darkTheme={darkTheme}
            setDarkTheme={setDarkTheme}
            path="/"
          />
          <Route exact path="/pokemon/:id" component={Pokemon} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
