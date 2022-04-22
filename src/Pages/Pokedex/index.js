import React, { useEffect, useState } from "react";
import { getPokemon, getAll } from "../../Services/pokeService";
import {
  Select,
  Box,
  Grid,
  GridItem,
  Image,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { types, typeInfo, regions } from "../../Utils";

const Pokedex = () => {
  const navigate = useNavigate();
  const [pokeList, setPokeList] = useState([]);
  const [data, setData] = useState();
  const [showError, setShowError] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [selectedType, setSelectedType] = useState();
  const logo =
    "https://archives.bulbagarden.net/media/upload/4/4b/Pokédex_logo.png";

  useEffect(() => {
    _getAll(selectedRegion.limit, selectedRegion.offset);
  }, [selectedRegion]);

  useEffect(() => {
    if (data) {
      if (selectedType) {
        if (selectedType.type !== "all") return filterType();
      }
      setPokeList(data);
    }
  }, [data, selectedType]);

  const _getAll = async (limit = 898, offset = 0) => {
    showError && setShowError(false);
    !!pokeList && setPokeList([]);
    try {
      let res = await getAll(limit, offset);
      _getPokemon(res.results);
    } catch (error) {
      setShowError(true);
    }
  };

  const _getPokemon = async (list) => {
    showError && setShowError(false);
    try {
      const res = await Promise.all(
        list.map(async (item) => {
          return await getPokemon(item.name);
        })
      );
      setData(res);
    } catch (error) {
      setShowError(true);
    }
  };

  const filterType = () => {
    showError && setShowError(false);
    var auxArr = [];
    data.map((item) =>
      item.types.map((elem) => {
        if (elem.type.name === selectedType.type) {
          auxArr.push(item);
        }
      })
    );
    setPokeList(auxArr);
    if (!auxArr.length) setShowError(true);
  };

  const handleChange = (e, option) => {
    const index = e.target.value;
    switch (option) {
      case "region":
        setSelectedRegion(regions[index]);
        break;
      case "type":
        setSelectedType(types[index]);
        break;
    }
  };

  const navigateTo = (id) => {
    const url = `/pokemon/${id}`;
    return navigate(url);
  };

  return (
    <div className="customContainer">
      <div className="container my-5">
        <img className="center" src={logo} />
        <text>@Alejandro Valdés</text>
        <div className="d-flex align-items-start bd-highlight mb-3 py-3">
          <div style={{ marginRight: "25px" }}>
            <text className="barcadeFont">Escoge región</text>
            <Select
              bg="tomato"
              focusBorderColor="tomato"
              variant="filled"
              defaultValue="Todas"
              onChange={(e) => handleChange(e, "region")}
            >
              {regions.map((item, index) => (
                <option className="options" key={index} value={index}>
                  {item.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <text className="barcadeFont">Escoge tipo</text>
            <Select
              bg="tomato"
              focusBorderColor="tomato"
              variant="filled"
              defaultValue="Todos"
              onChange={(e) => handleChange(e, "type")}
            >
              {types.map((item, index) => (
                <option
                  className="options"
                  key={index}
                  value={index}
                  color={"black"}
                >
                  {item.tipo}
                </option>
              ))}
            </Select>
          </div>
        </div>
        {!!pokeList.length ? (
          <Grid templateColumns={{ md: "repeat(5, 1fr)" }} gap={6}>
            {pokeList.map((item, index) => (
              <Box
                _hover={{
                  background: typeInfo(item.types[0]).color,
                  color: "white",
                }}
                key={index}
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                style={{ cursor: "pointer" }}
                onClick={() => navigateTo(item.id)}
              >
                <Image
                  src={item.sprites.other["official-artwork"].front_default}
                />
                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <div className="d-flex">
                      {item.types.map((types, i) => (
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
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </Box>
                  <Box className="barcadeFont">#{item.order}</Box>
                </Box>
              </Box>
            ))}
          </Grid>
        ) : showError ? (
          <text className="barcadeFont align-self-center">
            No hay pokemones en esta región 😔
          </text>
        ) : (
          <div className="d-flex">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              marginRight={"25px"}
            />
            <text className="barcadeFont align-self-center">Buscando...</text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokedex;
