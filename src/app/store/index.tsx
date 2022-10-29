import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";

import loaderSlice from "components/Loader/loaderSlice";
import pokemonSlice from "app/pokemon.slice";

export const store = configureStore({
  reducer: {
    [pokemonSlice.name]: pokemonSlice.reducer,
    [loaderSlice.name]: loaderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
