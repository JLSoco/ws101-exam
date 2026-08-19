import type { Pokemon } from "../types/api";
import Card from "./Card";

interface ItemListProps {
  items: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
}

const ItemList = ({ items, onSelect }: ItemListProps) => {
  if (items.length === 0) {
    return (
      <div className="no-results">
        <h2>No Pokémon found</h2>
        <p>Try another search.</p>
      </div>
    );
  }

  return (
    <div className="pokemon-grid">
      {items.map((pokemon) => (
        <Card
          key={pokemon.name}
          pokemon={pokemon}
          onClick={() => onSelect(pokemon)}
        />
      ))}
    </div>
  );
};

export default ItemList;