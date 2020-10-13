import * as React from "react";
import axios from "axios";

import {
  Box,
  CircularProgress,
  TextField,
  useTheme,
  makeStyles,
  Grid,
  Switch,
  IconButton,
  Button,
  Icon,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import ChevronRightSharpIcon from "@material-ui/icons/ChevronRightSharp";
import ChevronLeftSharpIcon from "@material-ui/icons/ChevronLeftSharp";

import Card from "../Card";
import logo from "../../img/logo";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "90%",
    height: "80vh",
    margin: "0 auto",
    alignItems: "center",
  },
  button: {
    marginLeft: "10px",
    padding: "15px",
  },
}));

function ListCard({ darkTheme, setDarkTheme }) {
  const classes = useStyles();
  const theme = useTheme();

  const [pokemons, setPokemons] = React.useState();
  const [searchPokemon, setSearchPokemon] = React.useState("");
  const [wantedPokemon, setWantedPokemon] = React.useState("");
  const [previousUrl, setPreviousUrl] = React.useState("");
  const [nextUrl, setNextUrl] = React.useState("");
  const initialUrl = "https://pokeapi.co/api/v2/pokemon/";

  React.useEffect(() => {
    async function getPokemons() {
      let response = await axios.get(initialUrl);
      setPokemons(response.data.results);
      setNextUrl(response.data.next);
      setPreviousUrl(response.data.previous);
    }
    getPokemons();
  }, []);

  const next = async () => {
    let response = await axios.get(nextUrl);
    await response.data.next;
    setNextUrl(response.data.next);
    setPreviousUrl(response.data.previous);
    setPokemons(response.data.results);
  };

  const previous = async () => {
    if (!previousUrl) return; //nao tenha pra onde retornar

    let response = await axios.get(previousUrl);
    await response.data.previous;
    setNextUrl(response.data.next);
    setPreviousUrl(response.data.previous);
    setPokemons(response.data.results);
  };

  //procurar por um pokemon
  async function handleSearchPokemon(event) {
    event.preventDefault();
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${searchPokemon}`
    );
    setWantedPokemon(response.data);
  }

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center" mb={2}>
        <img src={logo} alt="" width={400} />
      </Box>

      <Box display="flex" justifyContent="center" mb={2}>
        <form onSubmit={handleSearchPokemon}>
          <TextField
            id="outlined-basic"
            label="Look for a Pokemon =)"
            variant="outlined"
            value={searchPokemon}
            onChange={(event) => setSearchPokemon(event.target.value)}
          />
          <IconButton type="submit" className={classes.button}>
            <SearchIcon />
          </IconButton>
        </form>
      </Box>
      <Box textAlign="end" mr={10}>
        <Switch
          value={darkTheme}
          onChange={() => setDarkTheme(!darkTheme)}
          color="primary"
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mr={5} mb={3}>
        {previousUrl && (
          <Button
            variant="contained"
            onClick={previous}
            color="primary"
            className={classes.button}
            startIcon={
              <Icon>
                <ChevronLeftSharpIcon />
              </Icon>
            }
          >
            Voltar
          </Button>
        )}
        {nextUrl && (
          <Button
            variant="contained"
            onClick={next}
            color="primary"
            className={classes.button}
            endIcon={
              <Icon>
                <ChevronRightSharpIcon />
              </Icon>
            }
          >
            Próximo
          </Button>
        )}
      </Box>
      {wantedPokemon ? (
        <React.Fragment>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Card
              name={wantedPokemon.name}
              url={wantedPokemon.species.url}
              key={wantedPokemon.name}
            />
          </Box>
        </React.Fragment>
      ) : pokemons ? (
        <React.Fragment>
          <Grid container spacing={3} className={classes.container}>
            {pokemons.map((item) => (
              <Card name={item.name} url={item.url} key={item.name} />
            ))}
          </Grid>
        </React.Fragment>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </React.Fragment>
  );
}

export default ListCard;
