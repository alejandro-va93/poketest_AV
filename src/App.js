import React from 'react';
import logo from './logo.svg';
import Pokedex from './Pages/Pokedex/index';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
  return (
    <ChakraProvider>
      <Pokedex />
    </ChakraProvider>
  );
}

export default App;
