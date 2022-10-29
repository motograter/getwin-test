import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemonTypes } from "./pokemon.asyncActions";

const initialState: {
  pokemons: any[];
  totalPages: number;
  take: number;
  currentPage: number;
  selectedPokemon: any;
  pokemonTypes: any[];
} = {
  pokemons: [],
  pokemonTypes: [],
  selectedPokemon: null,
  currentPage: 1,
  totalPages: 0,
  take: 5,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setSizePage: (state, { payload }) => {
      state.take = payload;
    },
    setPokemons: (state, { payload }) => {
      state.pokemons = payload;
    },
    setTotalPages: (state, { payload }) => {
      state.totalPages = Math.ceil(payload / state.take);
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setSelectedPokemon: (state, { payload }) => {
      state.selectedPokemon = payload;
    },
    sortPokemonsByType: (state, { payload }) => {
      //https://redux-toolkit.js.org/api/createReducer#direct-state-mutation
      state.pokemons.sort((a: any, b: any) => {
        const targetAType = a.types.find(
          (type: any) => type.type.name === payload
        );
        const targetBType = b.types.find(
          (type: any) => type.type.name === payload
        );

        if (targetAType && targetBType) {
          return a.name.localeCompare(b.name);
        }

        if (targetAType) {
          return -1;
        }
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPokemonTypes.fulfilled, (state, { payload }) => {
      state.pokemonTypes = payload?.data?.results || [];
    });
  },
});

export const pokemonActions = pokemonSlice.actions;

export default {
  reducer: pokemonSlice.reducer,
  name: pokemonSlice.name,
};
