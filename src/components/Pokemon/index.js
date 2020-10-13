import * as React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Typography,
  makeStyles,
  LinearProgress,
  Chip,
  withStyles,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100vh",
    width: "85vw",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: "16px",
  },
  title: {
    textTransform: "Capitalize",
    fontWeight: "bold",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "30px",
    color: theme.palette.primary,
  },
  back: {
    width: "100px",
    textDecoration: "none",
    fontSize: "1.5em ",
    fontFamily: "Roboto, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  body: {
    background: theme.palette.background.default,
    height: "100%",
    width: "100%",
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    width: "70%",
  },
  colorPrimary: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1552e2",
  },
}))(LinearProgress);

export default function Pokemon() {
  const classes = useStyles();

  const [namePokemon, setNamePokemon] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  //stats
  const [hp, setHp] = React.useState("");
  const [attack, setAttack] = React.useState("");
  const [defense, setDefense] = React.useState("");
  const [specialAttack, setSpecialAttack] = React.useState("");
  const [specialDefense, setSpecialDefense] = React.useState("");
  const [speed, setSpeed] = React.useState("");
  const [abilities, setAbilities] = React.useState("");
  const [image, setImage] = React.useState("");

  let { id } = useParams(); //id do pokemon da url

  React.useEffect(() => {
    async function getInformationPokemon() {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const response = await axios.get(pokemonUrl);

      //valores da raiz "data"
      setNamePokemon(response.data.name);
      setWeight(response.data.weight);
      setHeight(response.data.height);

      //habilidades
      const abilities = response.data.abilities
        .map((ability) => {
          return ability.ability.name
            .toLowerCase()
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      setAbilities(abilities);
      setImage(response.data.sprites.other.dream_world.front_default);

      //hp, attack, defense, special-attack, special-defense, speed of pokemon
      response.data.stats.map((item) => {
        switch (item.stat.name) {
          case "hp":
            setHp(item.base_stat);
            break;
          case "attack":
            setAttack(item.base_stat);
            break;
          case "defense":
            setDefense(item.base_stat);
            break;
          case "special-attack":
            setSpecialAttack(item.base_stat);
            break;
          case "special-defense":
            setSpecialDefense(item.base_stat);
            break;
          case "speed":
            setSpeed(item.base_stat);
            break;

          default:
            break;
        }
      });
    }
    getInformationPokemon();
  }, [id]);

  return (
    <React.Fragment>
      <section className={classes.body}>
        <Box>
          <Link to="/" className={classes.back}>
            Voltar
          </Link>
        </Box>
        <Box className={classes.content}>
          <Box ml={10}>
            <Box className={classes.header}>
              <Typography
                className={classes.title}
                color="secondary"
                component="h4"
                variant="h4"
              >
                {namePokemon}
              </Typography>
              <Chip label={abilities} variant="outlined" color="secondary" />
              <Typography
                className={classes.title}
                color="secondary"
                component="h4"
                variant="h4"
              >
                # {id}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography color="textSecondary" className={classes.title}>
                  Peso:
                </Typography>
                <Typography color="secondary">{weight}kg</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="textSecondary" className={classes.title}>
                  Altura:
                </Typography>
                <Typography color="secondary">{height} metros </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography color="textSecondary" className={classes.title}>
                  HP: {hp}
                </Typography>
                <BorderLinearProgress variant="determinate" value={hp} />
              </Grid>

              <Grid item xs={12}>
                <Typography color="textSecondary" className={classes.title}>
                  Ataque: {attack}
                </Typography>
                <BorderLinearProgress variant="determinate" value={attack} />
              </Grid>

              <Grid item xs={12}>
                <Typography color="textSecondary" className={classes.title}>
                  Defesa: {defense}
                </Typography>
                <BorderLinearProgress variant="determinate" value={defense} />
              </Grid>

              <Grid item xs={12}>
                <Typography color="textSecondary" className={classes.title}>
                  Ataque especial: {specialAttack}
                </Typography>
                <BorderLinearProgress
                  variant="determinate"
                  value={specialAttack}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography color="textSecondary" className={classes.title}>
                  Defesa especial: {specialDefense}
                </Typography>
                <BorderLinearProgress
                  variant="determinate"
                  value={specialDefense}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography color="textSecondary" className={classes.title}>
                  Velocidade: {speed}
                </Typography>
                <BorderLinearProgress variant="determinate" value={speed} />
              </Grid>
            </Grid>
          </Box>
          <Box mr={10}>
            <img src={image} alt={namePokemon} />
          </Box>
        </Box>
      </section>
    </React.Fragment>
  );
}
