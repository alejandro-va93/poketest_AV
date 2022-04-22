export const types = [
  { tipo: "Todos", type: "all", color: "" },
  { tipo: "Bicho", type: "bug", color: "#A6B91A" },
  { tipo: "Dragón", type: "dragon", color: "#6F35FC" },
  { tipo: "Eléctrico", type: "electric", color: "#F7D02C" },
  { tipo: "Hada", type: "fairy", color: "#D685AD" },
  { tipo: "Lucha", type: "fighting", color: "#C22E28" },
  { tipo: "Fuego", type: "fire", color: "#EE8130" },
  { tipo: "Volador", type: "flying", color: "#A98FF3" },
  { tipo: "Fantasma", type: "ghost", color: "#735797" },
  { tipo: "Planta", type: "grass", color: "#7AC74C" },
  { tipo: "Tierra", type: "ground", color: "#E2BF65" },
  { tipo: "Hielo", type: "ice", color: "#96D9D6" },
  { tipo: "Normal", type: "normal", color: "#A8A77A" },
  { tipo: "Veneno", type: "poison", color: "#A33EA1" },
  { tipo: "Psíquico", type: "psychic", color: "#F95587" },
  { tipo: "Roca", type: "rock", color: "#B6A136" },
  { tipo: "Acero", type: "steel", color: "#B7B7CE" },
  { tipo: "Agua", type: "water", color: "#A6B91A" },
  { tipo: "Siniestro", type: "dark", color: "#705746" },
];

export const typeInfo = (type) => {
  return types.find((item) => item.type === type.type.name);
};

export const regions = [
  { name: "Todas", limit: 898, offset: 0 },
  { name: "Kanto [1-151]", limit: 151, offset: 0 },
  { name: "Johto [152-251]", limit: 100, offset: 151 },
  { name: "Hoenn [252-386]", limit: 135, offset: 251 },
  { name: "Sinnoh [387-494]", limit: 108, offset: 386 },
  { name: "Unova [495-649]", limit: 155, offset: 494 },
  { name: "Kalos [650-721]", limit: 72, offset: 649 },
  { name: "Alola [722-809]", limit: 88, offset: 721 },
  { name: "Galar [810-898]", limit: 89, offset: 809 },
];
