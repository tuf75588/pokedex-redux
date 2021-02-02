import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import fromApi from '../api/fromApi';
import { SliceStatus } from '../globals';
import { camelcaseObject } from '../utils/camelcaseObject';
import { NamedApiResource } from './types';
import { RootState } from './store';
import { statusHandlerReducer, wrapReduxAsyncHandler } from './utilities';

export type ChainLink = {
  isBaby: boolean;
  species: NamedApiResource;
  evolutionDetails: {
    item: NamedApiResource;
    trigger: NamedApiResource;
    gender: number;
    heldItem: NamedApiResource;
    knownMove: NamedApiResource;
    knownMoveType: NamedApiResource;
    location: NamedApiResource;
    minLevel: NamedApiResource;
    minHappiness: NamedApiResource;
    minBeauty: NamedApiResource;
    minAffection: NamedApiResource;
    needsOverworldRain: boolean;
    partySpecies: NamedApiResource;
    partyType: NamedApiResource;
    relativePhysicalStats: number;
    timeOfDay: string;
    tradeSpecies: NamedApiResource;
    turnUpsideDown: boolean;
  }[];
  evolvesTo: ChainLink[];
};

export type EvolutionChain = {
  id: number;
  babyTriggerItem: NamedApiResource;
  chain: ChainLink;
};

type SliceState = {
  data: EvolutionChain[];
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

const evolutionChainSlice = createSlice({
  name: 'evolutionChains',
  initialState,
  reducers: {
    ...statusHandlerReducer,
    getEvolutionChainReducer(
      state: SliceState,
      action: PayloadAction<{ evolutionChain: EvolutionChain }>
    ) {
      const { evolutionChain } = action.payload;
      const isExist = state.data.find((e) => e.id === evolutionChain.id);
      if (!isExist) {
        state.data.push(evolutionChain);
      }
    },
  },
});

export const {
  initialize,
  error,
  success,
  getEvolutionChainReducer,
} = evolutionChainSlice.actions;
export const statusHandler = { initialize, error, success };

export const evolutionChainsSelector = (state: RootState) => {
  return state.evolutionChain;
};
export const evolutionChainReducer = evolutionChainSlice.reducer;

export const getEvolutionChainByName = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { name }) => {
    const result = await fromApi.getEvolutionChainByNameOrId(name);
    dispatch(
      getEvolutionChainReducer({ evolutionChain: camelcaseObject(result) })
    );
  }
);

export const getEvolutionChainById = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { id }) => {
    const result = await fromApi.getEvolutionChainByNameOrId(Number(id));
    dispatch(
      getEvolutionChainReducer({ evolutionChain: camelcaseObject(result) })
    );
  }
);
