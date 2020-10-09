import React from "react";
import { ThemeProvider, createMuiTheme, Box } from "@material-ui/core";

import ListCard from "./components/ListCard";

function App() {
  const [darkTheme, setDarkTheme] = React.useState(false);

  const theme = createMuiTheme({
    //object theme
    palette: {
      type: darkTheme ? "dark" : "light",
      primary: {
        main: "#f44336",
      },
      secondary: {
        main: darkTheme ? "#3EA6FF" : "#065fd4",
      },
      background: {
        default: darkTheme ? "#232323" : "#FFF",
        dark: darkTheme ? "#181818" : "#f4f6f8",
        paper: darkTheme ? "#232323" : "#FFF",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <ListCard darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
    </ThemeProvider>
  );
}

export default App;
