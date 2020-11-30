import React from 'react';

type Props = {
  alt: string;
  src: string;
};

function PokemonIcon({ alt, src }: Props) {
  return <img src={src} alt={alt} style={{ height: 30, width: 30 }} />;
}

export default PokemonIcon;
