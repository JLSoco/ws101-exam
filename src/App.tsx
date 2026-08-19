import { useMemo, useReducer, useState } from "react";
import useFetch from "./hooks/useFetch";
import type { Pokemon, PokemonListResponse } from "./types/api";

import SearchBar from "./components/SearchBar";
import ItemList from "./components/ItemList";
import PokemonModal from "./components/PokemonModal";

interface AppState {
  search: string;
  selectedPokemon: Pokemon | null;
}

type AppAction =
  | {
      type: "SET_SEARCH";
      payload: string;
    }
  | {
      type: "SELECT_POKEMON";
      payload: Pokemon | null;
    };

const initialState: AppState = {
  search: "",
  selectedPokemon: null,
};

const reducer = (
  state: AppState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
      };

    case "SELECT_POKEMON":
      return {
        ...state,
        selectedPokemon: action.payload,
      };

    default:
      return state;
  }
};

// Get all Pokémon
const API_URL =
  "https://pokeapi.co/api/v2/pokemon?limit=1025";

const POKEMON_PER_PAGE = 20;

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const result =
    useFetch<PokemonListResponse>(API_URL);

  // Search all Pokémon
  const filteredPokemon = useMemo(() => {
    if (result.status !== "success") {
      return [];
    }

    return result.data.results.filter((pokemon) =>
      pokemon.name
        .toLowerCase()
        .includes(state.search.toLowerCase())
    );
  }, [result, state.search]);

  // Calculate total pages
  const totalPages = Math.ceil(
    filteredPokemon.length / POKEMON_PER_PAGE
  );

  // Get only 20 Pokémon for the current page
  const displayedPokemon = useMemo(() => {
    const startIndex =
      (currentPage - 1) * POKEMON_PER_PAGE;

    const endIndex =
      startIndex + POKEMON_PER_PAGE;

    return filteredPokemon.slice(
      startIndex,
      endIndex
    );
  }, [filteredPokemon, currentPage]);

  // Reset to page 1 when searching
  const handleSearch = (value: string) => {
    dispatch({
      type: "SET_SEARCH",
      payload: value,
    });

    setCurrentPage(1);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <header className="header">
        <div>
          <h1>PokéExplorer</h1>
          <p>Explore Pokémon using the PokéAPI</p>
        </div>

        <button
          className="theme-button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      <main className="container">
        <SearchBar
          value={state.search}
          onChange={handleSearch}
        />

        {result.status === "loading" && (
          <div className="status">
            <div className="spinner"></div>
            <h2>Loading Pokémon...</h2>
          </div>
        )}

        {result.status === "error" && (
          <div className="status error-box">
            <h2>Something went wrong</h2>

            <p>{result.error}</p>

            <button
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {result.status === "success" && (
          <>
            <div className="results-info">
              <p>
                Showing{" "}
                <strong>
                  {displayedPokemon.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {filteredPokemon.length}
                </strong>{" "}
                Pokémon
              </p>
            </div>

            <ItemList
              items={displayedPokemon}
              onSelect={(pokemon) =>
                dispatch({
                  type: "SELECT_POKEMON",
                  payload: pokemon,
                })
              }
            />

            {filteredPokemon.length > 0 && (
              <div className="pagination">
                <button
                  className="pagination-button"
                  onClick={() =>
                    setCurrentPage(
                      currentPage - 1
                    )
                  }
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>

                <span className="page-number">
                  Page {currentPage} of{" "}
                  {totalPages}
                </span>

                <button
                  className="pagination-button"
                  onClick={() =>
                    setCurrentPage(
                      currentPage + 1
                    )
                  }
                  disabled={
                    currentPage === totalPages
                  }
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {state.selectedPokemon && (
        <PokemonModal
          pokemonName={state.selectedPokemon.name}
          onClose={() =>
            dispatch({
              type: "SELECT_POKEMON",
              payload: null,
            })
          }
        />
      )}
    </div>
  );
}

export default App;