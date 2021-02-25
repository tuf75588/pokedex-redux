import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import SplashScreen from './components/SplashScreen';
import {
  getCachedPokemons,
  cachedPokemonsSelector,
} from './features/cachedPokemonSlice';
import { SliceStatus } from './globals';

function App() {
  const dispatch = useDispatch();
  const cachedPokemons = useSelector(cachedPokemonsSelector);
  useEffect(() => {
    dispatch(getCachedPokemons());
    // eslint-disable-next-line
  }, []);
  return (
    <React.Fragment>
      {cachedPokemons.status.state === SliceStatus.LOADING ||
      cachedPokemons.status.state === SliceStatus.IDLE ? (
        <SplashScreen />
      ) : (
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      )}
    </React.Fragment>
  );
}

export default App;
