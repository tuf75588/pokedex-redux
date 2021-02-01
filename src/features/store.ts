import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { configure } from '@testing-library/react';
import { config } from 'process';
import { cachedPokemonsReducer } from './cachedPokemonSlice';
import { pokemonsReducer } from './pokemonSlice';
import { speciesReducer } from './speciesSlice';
export const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  cachedPokemons: cachedPokemonsReducer,
  species: speciesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
