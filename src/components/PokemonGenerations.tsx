import React, { useCallback } from 'react';
import Modal from './Modal';
import PokemonGenerationsCard from './PokemonGenerationCard';
import PokemonIcon from './PokemonIcon';
import { importPokemonImage } from '../globals';
import { PokemonGenerationsEnum } from '../features/cachedPokemonSlice';

const generations = [
  [
    importPokemonImage('bulbasaur'),
    importPokemonImage('charmander'),
    importPokemonImage('squirtle'),
  ],
  [
    importPokemonImage('chikorita'),
    importPokemonImage('cyndaquil'),
    importPokemonImage('totodile'),
  ],
  [
    importPokemonImage('treecko'),
    importPokemonImage('torchic'),
    importPokemonImage('mudkip'),
  ],
  [
    importPokemonImage('turtwig'),
    importPokemonImage('chimcar'),
    importPokemonImage('piplup'),
  ],
  [
    importPokemonImage('snivy'),
    importPokemonImage('tepig'),
    importPokemonImage('oshawott'),
  ],
  [
    importPokemonImage('chespin'),
    importPokemonImage('fennekin'),
    importPokemonImage('froakie'),
  ],
  [
    importPokemonImage('rowlet'),
    importPokemonImage('litten'),
    importPokemonImage('popplio'),
  ],
];

type Props = {
  selectedGeneration: PokemonGenerationsEnum | null;
  setSelectedGeneration: React.Dispatch<
    React.SetStateAction<PokemonGenerationsEnum | null>
  >;
  changeGenerationHandler: () => void;
  isLoading: boolean;
};

function PokemonGenerations({
  selectedGeneration,
  setSelectedGeneration,
  changeGenerationHandler,
  isLoading,
}: Props) {
  const indexToPokemonGenerations = useCallback(
    (realIndex: number): PokemonGenerationsEnum | null => {
      const pokemonGenerations = Object.entries(PokemonGenerationsEnum);
      let selectedEnum: PokemonGenerationsEnum | null = null;
      pokemonGenerations.forEach(([_, b], index) => {
        if (index === realIndex) {
          selectedEnum = b;
        }
      });
      return selectedEnum;
    },
    []
  );
}
