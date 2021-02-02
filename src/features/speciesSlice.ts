import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import fromAPI from '../api/fromApi';
import fromApi from '../api/fromApi';
import { SliceStatus } from '../globals';
import { camelcaseObject } from '../utils/camelcaseObject';
import { RootState } from './store';
import {NamedApiResource } from './types';
import { statusHandlerReducer, wrapReduxAsyncHandler } from './utilities';

// type representing a specific pokemon species

export type Species = {
  id: number;
  name: string;
  order: number;
  genderRate: number;
  captureRate: number;
  baseHappiness: number;
  isBaby: boolean;
  isLegendary: boolean;
  isMythical: boolean;
  hatchCounter: number;
  hasGenderDifferences: boolean;
  formsSwitchable: boolean;
  growthRate: NamedApiResource;
  pokedexNumbers: {
    entryNumber: number;
    pokedex: NamedApiResource;
  }[];
  eggGroups: NamedApiResource[];
  color: NamedApiResource;
  shape: NamedApiResource;
  evolvesFromSpecies: NamedApiResource;
  evolutionChain: NamedApiResource;
  habitat: NamedApiResource;
  generation: NamedApiResource;
  names: {
    name: string;
    language: NamedApiResource;
  }[];
  palParkEncounters: {
    baseScore: number;
    rate: number;
    area: {
      name: string;
      url: string;
    };
  }[];
  flavorTextEntries: {
    flavorText: string;
    language: NamedApiResource;
    version: NamedApiResource;
  }[];
  formDescriptions: {
    description: string;
    language: NamedApiResource;
  }[];
  genera: {
    genus: string;
    language: NamedApiResource;
  }[];
  varieties: {
    isDefault: boolean;
    pokemon: NamedApiResource;
  }[];
};

type SliceState = {
  data: Species[];
  status: {
    state: SliceStatus.IDLE;
  };
};

const initialState: SliceState = {
  data: [],
  status: {
    state: SliceStatus.IDLE,
  },
};

const speciesSlice = createSlice({
  name: 'species',
  initialState,
  reducers: {
    ...statusHandlerReducer,
    getSpeciesReducer(state, action: PayloadAction<{ species: Species }>) {
      const { species } = action.payload;
      const isSpeciesAlreadyExists = state.data.find(
        (existingSpecies) => existingSpecies.id === species.id
      );
      if (!isSpeciesAlreadyExists) {
        state.data.push(species);
      }
    },
  },
});
export const speciesReducer = speciesSlice.reducer;

export const {
  initialize,
  error,
  success,
  getSpeciesReducer,
} = speciesSlice.actions;

export const speciesSelector = (state: RootState) => state.species;

const statusHandler = { initialize, error, success };

export const getSpeciesByName = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { pokemonName }) => {
    const pokemonSpecies = await fromAPI.getSpeciesByNameOrId(pokemonName);
    dispatch(getSpeciesReducer({ species: camelcaseObject(pokemonSpecies) }));
  }
);

export const getSpeciesById = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { pokemonId }) => {
    const pokemonSpecies = await fromApi.getSpeciesByNameOrId(pokemonId);
    dispatch(getSpeciesReducer({ species: camelcaseObject(pokemonSpecies) }));
  }
);
