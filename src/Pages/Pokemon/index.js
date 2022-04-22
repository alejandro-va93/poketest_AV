import React, { useEffect, useState } from "react";
import { getPokemon } from "../../Services/pokeService";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Image, Badge } from "@chakra-ui/react";
import { typeInfo } from "../../Utils";

const Pokemon = () => {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState();
  let { id } = useParams();
  const stats = ["ps", "atq", "def", "esp-atq", "esp-def", "vel"];
  const logo =
    "https://archives.bulbagarden.net/media/upload/4/4b/Pokédex_logo.png";

  useEffect(() => {
    _getPokemon(id);
  }, []);

  const _getPokemon = async () => {
    showError && setShowError(false);
    try {
      const res = await getPokemon(id);
      if (!res) throw "error";
      setPokemon(res);
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <div className="App-header">
      {pokemon ? (
        <Box
          className="App-logo"
          backgroundColor={typeInfo(pokemon.types[0]).color}
          _hover={{
            color: "white",
          }}
          minH="sm"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          style={{ cursor: "pointer" }}
          mt={[9, 0]}
          mx={[7, 0]}
        >
          <Image
            className="text-center"
            src={logo}
            width={"50%"}
            onClick={() => navigate("/pokedex")}
          />
          <Box p="6" display={"flex"}>
            <div style={{ marginRight: "15px" }}>
              <Box display="flex" alignItems="baseline">
                <div className="d-flex">
                  {pokemon.types.map((types, i) => (
                    <Badge
                      _hover={{
                        color: "white",
                        borderColor: "white",
                      }}
                      key={i}
                      borderRadius="full"
                      px="2"
                      backgroundColor={typeInfo(types).color}
                      borderColor="blackAlpha.600"
                      borderWidth="2px"
                      marginRight="8px"
                    >
                      {typeInfo(types).tipo}
                    </Badge>
                  ))}
                </div>
              </Box>
              <Box
                className="barcadeFont"
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                alignItems="center"
              >
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </Box>
              <Box className="barcadeFont">#{pokemon.order}</Box>
            </div>
            <Image
              className="align-self-center"
              width={"25%"}
              height={"25%"}
              src={
                pokemon.sprites.versions["generation-v"]["black-white"].animated
                  .front_default
              }
            />
          </Box>
          <div className="">
            <Box className="barcadeFont" backgroundColor={"blackAlpha.500"}>
              Estatura: {pokemon.height / 10}mt.
            </Box>
            <Box className="barcadeFont" backgroundColor={"blackAlpha.500"}>
              Peso: {pokemon.weight / 10}kg.
            </Box>
          </div>
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default}
          />
          <div>
            {pokemon.stats.map((item, index) => (
              <Box className="barcadeFont" backgroundColor={"blackAlpha.500"}>
                {stats[index]} : {item.base_stat}
              </Box>
            ))}
          </div>
          <div>
            {pokemon.abilities.map((item, index) => (
              <Box className="barcadeFont" backgroundColor={"blackAlpha.700"}>
                Hab. {index + 1} : {item.ability.name}
              </Box>
            ))}
          </div>
        </Box>
      ) : (
        showError && (
          <>
            <Image
              className="text-center"
              src={logo}
              width={["50%", "20%"]}
              onClick={() => navigate("/pokedex")}
            />
            <text className="barcadeFont text-center">
              No se encontraron datos 😔
            </text>
          </>
        )
      )}
    </div>
  );
};

export default Pokemon;
