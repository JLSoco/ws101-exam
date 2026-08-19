import type { Pokemon } from "../types/api";

interface CardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

const Card = ({ pokemon, onClick }: CardProps) => {
  const pokemonId = pokemon.url
    .split("/")
    .filter(Boolean)
    .pop();

  return (
    <div className="pokemon-card" onClick={onClick}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
        alt={pokemon.name}
      />

      <h2>{pokemon.name}</h2>

      <p>#{pokemonId}</p>
    </div>
  );
};

export default Card;