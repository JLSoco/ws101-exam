import useFetch from "../hooks/useFetch";
import type { PokemonDetails } from "../types/api";

interface PokemonModalProps {
  pokemonName: string;
  onClose: () => void;
}

const PokemonModal = ({
  pokemonName,
  onClose,
}: PokemonModalProps) => {
  const state = useFetch<PokemonDetails>(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        {state.status === "loading" && (
          <div className="modal-message">
            <h2>Loading...</h2>
          </div>
        )}

        {state.status === "error" && (
          <div className="modal-message error">
            <h2>Error</h2>
            <p>{state.error}</p>
          </div>
        )}

        {state.status === "success" && (
          <div className="pokemon-details">
            <img
              src={state.data.sprites.front_default ?? ""}
              alt={state.data.name}
              className="detail-image"
            />

            <h2>{state.data.name}</h2>

            <p>
              <strong>ID:</strong> #{state.data.id}
            </p>

            <p>
              <strong>Height:</strong> {state.data.height}
            </p>

            <p>
              <strong>Weight:</strong> {state.data.weight}
            </p>

            <div className="types">
              <strong>Type:</strong>

              {state.data.types.map((type) => (
                <span key={type.slot} className="type">
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonModal;