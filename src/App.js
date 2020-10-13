import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import ListCard from "./components/ListCard";
import Pokemon from "./components/Pokemon";

function App() {
  return (
    <BrowserRouter>
      {/* <ThemeProvider theme={theme}> */}
      <Switch>
        <Route
          exact
          component={ListCard}
          // darkTheme={darkTheme}
          // setDarkTheme={setDarkTheme}
          path="/"
        />
        <Route exact path="/pokemon/:id" component={Pokemon} />
      </Switch>
      {/* </ThemeProvider> */}
    </BrowserRouter>
  );
}

export default App;
