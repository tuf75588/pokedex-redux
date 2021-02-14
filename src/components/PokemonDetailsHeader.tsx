import React, { useRef } from 'react';
import ProgressiveImage from 'react-progressive-image-loading';
import { useSpring, animated } from 'react-spring';
import { Pokemon } from '../features/pokemonSlice';
import { Species } from '../features/speciesSlice';
import { PokemonTypePlaceholders } from '../globals';
import { useResize } from '../hooks/useResize';
import leftPad from '../utils/leftPad';

// utility functions
function calc(x: number, y: number, width: number, height: number) {
  return [x - width / 2, y - height / 2];
}

function translate1(x: number, y: number) {
  return `translate3d(-${x / 30}px, -${y / 30}px, 0)`;
}

function translate2(x: number, y: number) {
  return `translate3d(${x / 20}px,${y / 20}px, 0)`;
}

const MaskSize = 225;
const ImageSize = 325;

const MaskStyling = {
  width: MaskSize,
  height: MaskSize,
  bottom: 55,
};

const PokemonImageStyling = {
  width: ImageSize,
  height: ImageSize,
  display: 'block',
  left: 0,
  right: 0,
  bottom: 5,
  margin: 'auto',
};

type Props = {
  pokemon: Pokemon;
  species: Species;
  selectedBackgroundColor: { light: string; medium: string };
};

function PokemonDetailsHeader({
  pokemon,
  species,
  selectedBackgroundColor,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width, height, top, left } = useResize(containerRef);
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));
  const kanjiName = species.names.find(
    (name) => name.language.name === 'ja-Hrkt'
  );
  const imagePlaceholder = pokemon.types.map(({ type }) => {
    const [[, image]] = Object.entries(PokemonTypePlaceholders).filter(
      ([key, _]) => {
        return key === type.name;
      }
    );
    return image;
  });
  return (
    <React.Fragment>
      <div
        className="w-full"
        ref={containerRef}
        onMouseMove={({ clientX, clientY }) =>
          set({
            xy: calc(clientX - left, clientY - top, width + left, height + top),
          })
        }
      ></div>
    </React.Fragment>
  );
}

export default PokemonDetailsHeader