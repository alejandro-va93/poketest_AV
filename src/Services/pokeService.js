import React from "react";
import Axios from "axios";
import { baseUrl } from "../Config";

export const getAll = async () => {
  try {
    const url = `${baseUrl}pokemon?limit=151&offset=0`;
    let res = await Axios.get(url);
    return res.data;
  } catch (error) {}
};

export const getPokemon = async (name) => {
  try {
    const url = `${baseUrl}pokemon/${name}`;
    let res = await Axios.get(url);
    return res.data;
  } catch (error) {}
};
