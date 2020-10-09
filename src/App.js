import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import ListCard from "./components/ListCard";
import Pokemon from "./components/Pokemon";

function App() {
  const [darkTheme, setDarkTheme] = React.useState(false);

  const theme = createMuiTheme({
    //object theme
    palette: {
      type: darkTheme ? "dark" : "light",
      primary: {
        main: "#3362ae",
      },
      secondary: {
        main: "#ff1a1a",
      },
      background: {
        default: darkTheme ? "#232323" : "#FFF",
        dark: darkTheme ? "#181818" : "#f4f6f8",
        paper: darkTheme ? "#232323" : "#FFF",
      },
    },
  });
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route
            exact
            component={ListCard}
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
