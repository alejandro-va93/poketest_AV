import React from "react";
import logo from "./logo.svg";
import Pokedex from "./Pages/Pokedex/index";
import Pokemon from "./Pages/Pokemon";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/pokedex" />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokemon/:id" element={<Pokemon />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
