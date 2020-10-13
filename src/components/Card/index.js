import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Grid,
  makeStyles,
  Typography,
  Card as CardOfPokemon,
  CardMedia,
  CardActions,
  CardContent,
  CardActionArea,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    border: "1px solid #d9d9d9",
  },
  image: {
    width: "15em",
    height: "15em",
    display: "flex",
    margin: "0px auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "5px",
    textTransform: "Capitalize",
    color: "#cccc00",
  },
  link: {
    padding: "10px",
    color: "#e6e600",
    letterSpacing: "1px",
    fontWeight: "bold",
  },
}));

function Card({ name, url }) {
  const classes = useStyles();

  const [idPokemon, setIdPokemon] = React.useState(0);
  const [imagePokemon, setImagePokemon] = React.useState("");
  const [typeColor, setTypeColor] = React.useState("");

  React.useEffect(() => {
    const pokemonIndex = url.split("/")[url.split("/").length - 2]; //pegar o id do pokemon que vem da url
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    setImagePokemon(imageUrl);
    setIdPokemon(pokemonIndex);

    async function getInfoPokemons() {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
      const response = await axios.get(pokemonUrl);

      //cor do tipo do pokemon
      response.data.types.map((type) => {
        const types = type.type.name;

        switch (types) {
          case "bug":
            setTypeColor("#3b9950");
            break;
          case "dark":
            setTypeColor("#040706");
            break;
          case "dragon":
            setTypeColor("#448b95");
            break;
          case "eletric":
            setTypeColor("#fbfb72");
            break;
          case "fairy":
            setTypeColor("#ea1369");
            break;
          case "fighting":
            setTypeColor("#ef6138");
            break;
          case "fire":
            setTypeColor("#ab1f23");
            break;
          case "flying":
            setTypeColor("#5788a8");
            break;
          case "ghost":
            setTypeColor("#33336b");
            break;
          case "grass":
            setTypeColor("#147b3d");
            break;
          case "ground":
            setTypeColor("#a9702c");
            break;
          case "ice":
            setTypeColor("#86d0f8");
            break;
          case "normal":
            setTypeColor("#6a4851");
            break;
          case "poison":
            setTypeColor("#8547d1");
            break;
          case "psychic":
            setTypeColor("#f81c91");
            break;
          case "rock":
            setTypeColor("#a54827");
            break;
          case "steel":
            setTypeColor("#42bd94");
            break;
          case "water":
            setTypeColor("#1552e2");
            break;

          default:
            setTypeColor("#FFF");
            break;
        }

        setTypeColor(types);
      });
    }
    getInfoPokemons();
  }, [url]);

  return (
    <React.Fragment>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        {
          (idPokemon,
          name,
          imagePokemon && (
            <CardOfPokemon
              className={classes.root}
              style={{
                background: `${typeColor}`,
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  className={classes.image}
                  alt={name}
                  image={imagePokemon}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className={classes.header}
                  >
                    {name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link className={classes.link} to={`pokemon/${idPokemon}`}>
                  Ver mais sobre
                </Link>
              </CardActions>
            </CardOfPokemon>
          ))
        }
      </Grid>
    </React.Fragment>
  );
}

export default Card;
