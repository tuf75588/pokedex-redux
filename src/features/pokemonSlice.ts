import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import fromApi from '../api/fromApi';
import { SliceStatus } from '../globals';
import { NamedApiResource } from './types';
import { camelcaseObject } from '../utils/camelcaseObject';
import {
  statusHandlerReducer,
  transformSpriteToBaseImage,
  wrapReduxAsyncHandler,
} from './utilities';

import { baseImageUrl } from '../api/axios';
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
    ability: NamedApiResource;
  }[];
  forms: NamedApiResource[];
  moves: {
    move: NamedApiResource;
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
  species: NamedApiResource[];
  stats: {
    baseStat: number;
    effort: number;
    stat: NamedApiResource;
  }[];
  types: {
    slot: number;
    type: NamedApiResource;
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

const statusHandler = { initialize, error, success };
export const getPokemons = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { page, cachedPokemons, pokemons }) => {
    const size = PAGINATE_SIZE - (pokemons.length % PAGINATE_SIZE);
    const results = cachedPokemons.slice(page, page + size);
    dispatch(initializePokemonsReducer({ size }));
    for await (const [index, { url }] of results.entries()) {
      const pokemonId = Number(url.split('/').slice(-2)[0]);
      const pokemon = await fromApi.getPokemonByNameOrId(pokemonId);
      const pokemonImageUrl = transformSpriteToBaseImage(
        pokemon.id,
        baseImageUrl
      );
      dispatch(
        getPokemonsReducer({
          pokemon: {
            ...camelcaseObject(pokemon),
            sprites: {
              frontDefault: pokemonImageUrl,
            },
          },
          size,
          index,
        })
      );
    }
  }
);

export const getPokemonById = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { pokemonId }) => {
    const pokemon = await fromApi.getPokemonByNameOrId(pokemonId);
    const pokemonImageUrl = transformSpriteToBaseImage(
      pokemon.id,
      baseImageUrl
    );
    const transformedPokemon = {
      ...camelcaseObject(pokemon),
      sprites: { frontDefault: pokemonImageUrl },
    };
    dispatch(getSinglePokemonReducer({ pokemon: transformedPokemon }));
  }
);
export const getPokemonsDynamically = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { pokemonIds }) => {
    for await (const id of pokemonIds) {
      const pokemon = await fromApi.getPokemonByNameOrId(id);
      const pokemonImageUrl = transformSpriteToBaseImage(
        pokemon.id,
        baseImageUrl
      );
      const transformedPokemon = {
        ...camelcaseObject(pokemon),
        sprites: { frontDefault: pokemonImageUrl },
      };
      dispatch(getSinglePokemonReducer({ pokemon: transformedPokemon }));
    }
  }
);
