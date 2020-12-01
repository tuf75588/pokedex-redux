import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import fromApi from '../api/fromApi';
import { SliceStatus } from '../globals';
import { RootState } from './store';
import { NamedApiResource, NamedAPIResource } from './types';
import { statusHandlerReducer, wrapReduxAsyncHandler } from './utilities';
import Levenshtein from 'fast-levenshtein';
import { shuffle } from '../utils/shuffle';
import { camelcaseObject } from '../utils/camelCaseObject';

export enum PokemonGenerationsEnum {
  GENERATION_1 = '151',
  GENERATION_2 = '251',
  GENERATION_3 = '386',
  GENERATION_4 = '494',
  GENERATION_5 = '649',
  GENERATION_6 = '721',
  GENERATION_7 = '809',
}

type SliceState = {
  cache: (NamedApiResource & { distance: number })[];
  data: (NamedApiResource & { distance: number })[];
  status: {
    state: SliceStatus;
  };
};

const initialState: SliceState = {
  cache: [],
  data: [],
  status: {
    state: SliceStatus.IDLE,
  },
};

const cachedPokemonsSlice = createSlice({
  name: 'cachedPokemons',
  initialState,
  reducers: {
    ...statusHandlerReducer,
    getCachedPokemonsReducer(
      state,
      action: PayloadAction<{
        cachedPokemons: (NamedApiResource & { distance: number })[];
      }>
    ) {
      const { cachedPokemons } = action.payload;
      state.cache = cachedPokemons;
      state.data = shuffle([...cachedPokemons]);
    },
    searchByPokemonsNameReducer(
      state,
      action: PayloadAction<{ pokemonName: string }>
    ) {
      const { pokemonName } = action.payload;
      state.data = state.cache
        .map((pokemon) => {
          return {
            ...pokemon,
            distance: Levenshtein.get(pokemon.name, pokemonName),
          };
        })
        .sort((a, b) => a.distance - b.distance);
      console.log({ state });
    },
    filterPokemonsByGenerationReducer(
      state,
      action: PayloadAction<{
        selectedGeneration: PokemonGenerationsEnum | null;
      }>
    ) {
      const { selectedGeneration } = action.payload;
      let cache: (NamedApiResource & { distance: number })[] = state.cache;
      if (selectedGeneration) {
        const generations = Object.entries(PokemonGenerationsEnum);
        let startingIndex: number = 0;
        generations.forEach(([_, b], index) => {
          if (b === selectedGeneration) {
            startingIndex = index === 0 ? 0 : Number(generations[index - 1][1]);
          }
        });
        cache = state.cache.slice(startingIndex, Number(selectedGeneration));
      }
      state.data = cache;
    },
    randomizePokemonsReducer(state, action) {
      state.data = shuffle([...state.cache]);
    },
  },
});

export const cachedPokemonsReducer = cachedPokemonsSlice.reducer;
export const {
  initialize,
  error,
  success,
  getCachedPokemonsReducer,
  searchByPokemonsNameReducer,
  filterPokemonsByGenerationReducer,
  randomizePokemonsReducer,
} = cachedPokemonsSlice.actions;

const statusHandler = { initialize, error, success };

// cache selector
export function cachedPokemonsSelector(state: RootState) {
  return state.cachedPokemons;
}

export const getCachedPokemons = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch) => {
    const {
      results,
    }: { results: NamedApiResource[] } = await fromApi.getPokemons(
      Number(PokemonGenerationsEnum.GENERATION_7)
    );
    const transformedPokemons = results.map((res: NamedApiResource) => ({
      ...res,
      distance: 0,
    }));
    dispatch(
      getCachedPokemonsReducer({
        cachedPokemons: camelcaseObject(transformedPokemons),
      })
    );
  }
);
