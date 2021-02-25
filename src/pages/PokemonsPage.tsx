import React from 'react';
import PokemonForm from '../components/PokemonForm';
import Layout from '../components/Layout';
import InfiniteScroll from '../components/InfiniteScroll';
import PokemonCard from '../components/PokemonCard';
import { useSelector } from 'react-redux';
import {pokemonsSelector, getPokemons} from '../features/pokemonSlice';
import {SliceStatus} from '../globals'
import {cachedPokemonsSelector} from '../features/cachedPokemonSlice';
import PokemonSkeleton from '../components/PokemonSkeleton';
import {AiFillGithub} from 'react-icons/ai';

function PokemonsPage() {
  const pokemons = useSelector(pokemonsSelector)
}