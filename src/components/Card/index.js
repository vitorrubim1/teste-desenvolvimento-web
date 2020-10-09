import * as React from "react";
import { Link } from "react-router-dom";

import {
  Grid,
  makeStyles,
  Typography,
  Box,
  Card as CardOfPokemons,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  },
  image: {
    width: "10em",
    height: "10em",
    display: "flex",
    margin: "0px auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "5px",
    textTransform: "Capitalize",
  },
}));

function Card({ name, url }) {
  const classes = useStyles();

  const [idPokemon, setIdPokemon] = React.useState(0);
  const [imagePokemon, setImagePokemon] = React.useState("");
  const [toManyRequest, setToManyRequest] = React.useState(false);

  React.useEffect(() => {
    const pokemonIndex = url.split("/")[url.split("/").length - 2]; //pegar o id do pokemon que vem da url
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

    setImagePokemon(imageUrl);
    setIdPokemon(pokemonIndex);
  }, [url]);

  return (
    <React.Fragment>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        {
          (idPokemon, name, imagePokemon ? (
            <CardOfPokemons className={classes.root}>
              <CardActionArea>
                <Box className={classes.header}>
                  <Typography component="h5" variant="h5" color="textSecondary">
                    {name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    {idPokemon}
                  </Typography>
                </Box>
                <CardMedia
                  component="img"
                  className={classes.image}
                  alt={name}
                  image={imagePokemon}
                  onError={() => setToManyRequest(true)}
                />

                {toManyRequest ? ( //por causa do limite de requisições do github :(
                  <Typography component="h5" variant="h5" color="secondary">
                    To many request :(
                  </Typography>
                ) : null}

                <CardContent></CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  <Link to={`pokemon/${idPokemon}`}>
                    See about this pokemon
                  </Link>
                </Button>
              </CardActions>
            </CardOfPokemons>
          ) : (
            <Box pt={0.5}>
              <Skeleton mb={2} />
              <Skeleton variant="rect" width="100%">
                <div style={{ paddingTop: "57%" }} />
              </Skeleton>
              <Skeleton width="60%" />
            </Box>
          ))
        }
      </Grid>
    </React.Fragment>
  );
}

export default Card;
