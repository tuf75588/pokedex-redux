import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { cachedPokemonsReducer } from './cachedPokemonSlice';
import { evolutionChainReducer } from './evolutionChainSlice';
import { pokemonsReducer } from './pokemonSlice';
import { speciesReducer } from './speciesSlice';
export const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  cachedPokemons: cachedPokemonsReducer,
  species: speciesReducer,
  evolutionChain: evolutionChainReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
