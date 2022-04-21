import React, { useEffect, useState } from "react";
import { getPokemon, getAll } from "../../Services/pokeService";
import { Select, Box, Grid, GridItem } from "@chakra-ui/react";
import "./index.css";

const Pokedex = () => {
  const [pokeList, setPokeList] = useState([]);
  const [pokeDetails, setPokeDetails] = useState([]);
  const [region] = useState([
    "Kanto [1-151]",
    "Johto [152-251]",
    "Hoenn [252-386]",
    "Sinnoh [387-494]",
    "Unova [495-649]",
    "Kalos [650-721]",
    "Alola [722-809]",
    "Galar [810-898]",
  ]);
  const [type] = useState([
    "Bicho",
    "Dragón",
    "Eléctrico",
    "Hada",
    "Lucha",
    "Fuego",
    "Volador",
    "Fantasma",
    "Planta",
    "Tierra",
    "Hielo",
    "Normal",
    "Veneno",
    "Psíquico",
    "Roca",
    "Acero",
    "Agua",
  ]);
  const logo =
    "https://archives.bulbagarden.net/media/upload/4/4b/Pokédex_logo.png";

  useEffect(() => {
    _getAll();
  }, []);

  useEffect(() => {
    pokeList.length && _getPokemon();
  }, [pokeList]);

  const _getPokemon = async () => {
    try {
      const res = await Promise.all(
        pokeList.map(async (item) => {
          return await getPokemon(item.name);
        })
      );
      setPokeDetails(res);
    } catch (error) {}
  };

  const _getAll = async () => {
    try {
      let res = await getAll();
      if (!res) throw "error";
      // console.log('_getAll', res)
      setPokeList(res.results);
    } catch (error) {}
  };

  return (
    pokeDetails.length && (
      <div className="container">
        <img className="center" src={logo} />
        <div className="d-flex justify-content-around bd-highlight mb-3 p-3">
          <Select placeholder="Región">
            {region.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Select placeholder="Tipo">
            {type.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Select placeholder="Región">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </div>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {pokeList.map((item, index) => (
            <GridItem key={index} w="100%" h="10" bg="blue.500">
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </GridItem>
          ))}
        </Grid>
      </div>
    )
  );
};

export default Pokedex;
