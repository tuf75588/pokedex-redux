import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import fromApi from '../api/fromApi';
import { SliceStatus } from '../globals';
import { NamedAPIResource, NamedApiResource } from './types';
import { camelCaseObject } from '../utils/camelCaseObject';
import {
  statusHandlerReducer,
  transformSpriteToImage,
  wrapReduxAsyncHandler,
} from './utilities';

import { baseImageUrl } from '../api/axios';
import { stat } from 'fs';
import { RootState } from './store';

export const PAGINATE_SIZE = 6;

/* 
this type represents our Pokemon object and 
all things found within/
*/

export type Pokemon = {
  id: number;
  name: string;
  baseExperience: number;
  height: number;
  isDefault: boolean;
  order: number;
  weight: number;
  abilities: {
    isHidden: boolean;
    slot: number;
    ability: NamedAPIResource;
  }[];
  forms: NamedAPIResource[];
  moves: {
    move: NamedAPIResource;
  }[];
  sprites: {
    frontDefault: string;
    frontShiny: string;
    frontFemale: string;
    frontShinyFemale: string;
    backDefault: string;
    backShiny: string;
    backFemale: string;
    backShinyFemale: string;
  };
  species: NamedAPIResource[];
  stats: {
    baseStat: number;
    effort: number;
    stat: NamedAPIResource;
  }[];
  types: {
    slot: number;
    type: NamedAPIResource;
  }[];
};

type SlicedState = {
  data: (Pokemon | null)[];
  status: {
    state: SliceStatus;
  };
};

const initialState: SlicedState = {
  data: [],
  status: {
    state: SliceStatus.IDLE,
  },
};

// slice reducer
const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    ...statusHandlerReducer,
    initializePokemonsReducer(state, action: PayloadAction<{ size: number }>) {
      const { size } = action.payload;
      const nullValues = new Array<null>(size).fill(null);
      if (state.data.length === 0) {
        state.data = nullValues;
      } else {
        state.data = state.data.concat(nullValues);
      }
    },
    getPokemonsReducer(
      state,
      action: PayloadAction<{ pokemon: Pokemon; index: number; size: number }>
    ) {
      const { pokemon, index, size } = action.payload;
      const isPokemonAlreadyExists = state.data.find((existingPokemon) => {
        return existingPokemon !== null && existingPokemon.id === pokemon.id;
      });
      // can we proceed?
      if (!isPokemonAlreadyExists) {
        state.data[state.data.length - (size - index)] = pokemon;
      }
    },
    getSinglePokemonReducer(
      state,
      action: PayloadAction<{ pokemon: Pokemon }>
    ) {
      const { pokemon } = action.payload;
      const isPokemonAlreadyExists = state.data.find((existingPokemon) => {
        return existingPokemon !== null && existingPokemon.id === pokemon.id;
      });
      if (!isPokemonAlreadyExists) {
        state.data.push(pokemon);
      }
    },
    resetPokemonsReducer(state, action) {
      state.data = [];
    },
  },
});
// initialize our reducer;

export const pokemonsReducer = pokemonsSlice.reducer;
export const {
  initialize,
  error,
  success,
  initializePokemonsReducer,
  getPokemonsReducer,
  resetPokemonsReducer,
  getSinglePokemonReducer,
} = pokemonsSlice.actions;

export const pokemonsSelector = (state: RootState) => {
  return state.pokemons;
};
