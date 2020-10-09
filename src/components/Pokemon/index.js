import * as React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

function Pokemon() {
  let { id } = useParams(); //pegando o id do pokemon da url

  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [pokemonsAbility, setPokemonsAbility] = React.useState("");
  const [effortValues, setEffortValues] = React.useState("");
  const [statistic, setStatistic] = React.useState("");

  async function getInformation() {
    /* urls para informações do pokemon */
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

    /* pegando e setando informações */
    const responsePokemons = await axios.get(pokemonUrl);

    setName(responsePokemons.data.name);
    setImage(responsePokemons.data.sprites.back_default);

    /* switch pra percorrer de uma vez só */
    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    responsePokemons.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        default:
          break;
        }
        setStatistic(stat);
    });
    /* end stat of pokemon */

    /* altura, largura, tipo e cor */
    const height =
      Math.round((responsePokemons.data.height * 0.328084 + 0.00001) * 100) /
      100;
    console.log(height);

    const weight =
      Math.round((responsePokemons.data.weight * 0.220462 + 0.00001) * 100) /
      100;
    console.log(weight);

    const types = responsePokemons.data.types.map((type) => type.type.name);

    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;
    /* end stat of pokemon */

    /* Habilidades */
    const ability = responsePokemons.data.abilities
      .map((ability) => {
        return ability.ability.name
          .toLowerCase()
          .split("-")
          .map((string) => string.charAt(0).toUpperCase() + string.substring(1))
          .join(" ");
      })
      .join(", ");

    setPokemonsAbility(ability);
    /* end abilities */

    /* attack e defense */
    const evs = responsePokemons.data.stats
      .filter((stat) => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map((stat) => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")}`;
      })
      .join(", ");

    setEffortValues(evs);
    /* end attack e defense */
  }

  getInformation();
  return (
    <React.Fragment>
      <h1>{name}</h1>
    </React.Fragment>
  );
}

export default Pokemon;
