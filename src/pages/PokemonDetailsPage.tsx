import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import Layout from '../components/Layout';
import PokemonDetailsBiography from '../components/PokemonDetailsBiography';
import PokemonDetailsEvolution from '../components/PokemonDetailsEvolution';
import PokemonDetailsHeader from '../components/PokemonDetailsHeader';
import PokemonDetailsStats from '../components/PokemonStats';
import Tab from '../components/Tab';
import {
  getPokemonById,
  getPokemonsDynamically,
  pokemonsSelector,
} from '../features/pokemonSlice';
import { getSpeciesById, speciesSelector } from '../features/speciesSlice';
import { PokemonTypeColors, SliceStatus } from '../globals';
import { ScaleLoader } from 'react-spinners';
import { useTransition, animated } from 'react-spring';
import capitalize from '../utils/capitalize';
import {
  ChainLink,
  evolutionChainSelector,
  getEvolutionChainById,
} from '../features/evolutionChainSlice';

type PokemonTabs = 'biography' | 'stats' | 'evolutions';

interface MatchParams {
  id: string;
}

function PokemonDetailsPage({ match }: RouteComponentProps<MatchParams>) {
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<PokemonTabs>('biography');
  const transitions = useTransition(activeTab, (p) => p, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 250,
    },
  });
  const pokemons = useSelector(pokemonsSelector);
  const species = useSelector(speciesSelector);
  const evolutionChain = useSelector(evolutionChainSelector);
  const [chainLinks, setChainLinks] = useState<ChainLink[]>([]);
  const [
    selectedEvolutionPokemonIds,
    setSelectedEvolutionPokemonIds,
  ] = useState<number[]>([]);

  const selectedPokemon = pokemons.data.find(
    (pokemon) => pokemon !== null && pokemon.id === Number(id)
  );
  const selectedSpecies = species.data.find((s) => s.id === Number(id));
  const evolutionChainId =
    selectedSpecies?.evolutionChain?.url.split('/').slice(-2)[0] || null;
  const selectedEvolutionChain =
    evolutionChainId !== null
      ? evolutionChain.data.find((e) => e.id === Number(evolutionChainId))
      : null;

  const getPokemonEvolution = useCallback(
    (chain: ChainLink | null): ChainLink[] => {
      if (!chain) return [];
      return [chain].concat(getPokemonEvolution(chain.evolvesTo[0]));
    },
    []
  );
  useEffect(() => {
    if (selectedEvolutionChain?.chain) {
      const pokemons: ChainLink[] = getPokemonEvolution(
        selectedEvolutionChain.chain
      );
      const pokemonIds = pokemons.map(({ species }) =>
        Number(species.url.split('/').slice(-2)[0])
      );
      dispatch(getPokemonsDynamically({ pokemonIds }));
      setSelectedEvolutionPokemonIds(pokemonIds);
      setChainLinks(pokemons);
    }
    // eslint-disable-next-line
  }, [selectedEvolutionChain]);
}
