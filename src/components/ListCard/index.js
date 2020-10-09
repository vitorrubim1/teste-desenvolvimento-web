import * as React from "react";
import axios from "axios";

import {
  Box,
  CircularProgress,
  TextField,
  useTheme,
  makeStyles,
  Grid,
} from "@material-ui/core";

import Card from "../Card";
import logo from "../../img/logo";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "90%",
    height: "80vh",
    // background: "#000",
    margin: "0 auto",
    alignItems: "center",
  },

  iconButton: {
    padding: 10,
  },
  searchInput: {
    width: "250px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function ListCard() {
  const classes = useStyles();
  const theme = useTheme();

  const [pokemons, setPokemons] = React.useState();

  React.useEffect(() => {
    async function getPokemons() {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/"
      );
      setPokemons(response.data.results);
    }

    getPokemons();
  }, []);

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center" mb={2}>
        <img src={logo} alt="" width={400} />
      </Box>

      <Box display="flex" justifyContent="center" mb={2}>
        <TextField
          id="outlined-basic"
          label="Look for a Pokemon =)"
          variant="outlined"
        />
      </Box>

      {pokemons ? (
        <React.Fragment>
          <Grid container spacing={3} className={classes.container}>
            {pokemons.map((item) => (
              <Card name={item.name} url={item.url} key={item.name} />
            ))}
          </Grid>
        </React.Fragment>
      ) : (
        <Box>
          <CircularProgress />
        </Box>
      )}
    </React.Fragment>
  );
}

export default ListCard;
