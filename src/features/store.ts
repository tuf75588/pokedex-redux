import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { configure } from '@testing-library/react';
import { config } from 'process';
import { pokemonsReducer } from './pokemonSlice';

export const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
