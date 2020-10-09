import * as React from "react";

import { Grid, makeStyles, Typography, Paper, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1),
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

function Card({ name, url }) {
  const classes = useStyles();

  const [idPokemon, setIdPokemon] = React.useState(0);
  const [imagePokemon, setImagePokemon] = React.useState("");

  React.useEffect(() => {
    const pokemonIndex = url.split("/")[url.split("/").length - 2]; //pegar o id do pokemon que vem da url
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    
    setImagePokemon(imageUrl);
    setIdPokemon(pokemonIndex);
  }, []);

  return (
    <React.Fragment>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <Paper classes={classes.paper}>
          <img
            src={imagePokemon}
            alt=""
            style={{ width: "100%"}}
          />
          <Box textAlign="center" mt={2} mb={3}>
            <Typography variant="h5"> {name} </Typography>
            <Typography variant="h5"> {idPokemon} </Typography>
          </Box>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

export default Card;
