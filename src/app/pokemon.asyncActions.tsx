import { createAsyncThunk } from "@reduxjs/toolkit";
import { loaderActions } from "components/Loader/loaderSlice";
import { pokemonActions } from "./pokemon.slice";
import axios, { AxiosResponse } from "axios";

type Pokemon = {
  name: string;
  url: string;
};

type Options = {
  offset?: number;
  take?: number;
};

const API_URL = "https://pokeapi.co/api/v2/";

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (options: Options, { rejectWithValue, dispatch }) => {
    dispatch(loaderActions.incrementLoader());
    try {
      const response = await axios.get(
        `${API_URL}pokemon/?limit=${options?.take}&offset=${options?.offset}`
      );
      return response as AxiosResponse;
    } catch (e: any) {
      console.log(e);
    } finally {
      dispatch(loaderActions.decrementLoader());
    }
  }
);

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async (url: string, { rejectWithValue, dispatch }) => {
    dispatch(loaderActions.incrementLoader());
    try {
      const response = await axios.get(url);
      return response as AxiosResponse;
    } catch (e: any) {
      console.log(e);
    } finally {
      dispatch(loaderActions.decrementLoader());
    }
  }
);

export const getPokemonList = (
  dispatch: any,
  options: Record<string, number>
) => {
  dispatch(loaderActions.incrementLoader());
  dispatch(fetchPokemons(options))
    .unwrap()
    .then(async (response: AxiosResponse) => {
      const all = await Promise.all(
        response.data.results.map((pokemon: Pokemon) => axios.get(pokemon.url))
      );
 
      const pokemons = all.map((response) => response.data);

      dispatch(pokemonActions.setPokemons(pokemons));
      dispatch(pokemonActions.setTotalPages(response.data.count));
      dispatch(loaderActions.decrementLoader())
    })
};


export const fetchPokemonTypes = createAsyncThunk(
  "pokemon/fetchPokemonTypes",
  async (_, { rejectWithValue, dispatch }) => {
    dispatch(loaderActions.incrementLoader());
    try {
      const response = await axios.get(
        `${API_URL}type`
      );
      return response as AxiosResponse;
    } catch (e: any) {
      console.log(e);
    } finally {
      dispatch(loaderActions.decrementLoader());
    }
  }
);