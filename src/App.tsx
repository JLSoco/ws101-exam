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
              <strong>{displayedPokemon.length}</strong>{" "}
              of{" "}
              <strong>{filteredPokemon.length}</strong>{" "}
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
                  setCurrentPage(currentPage - 1)
                }
                disabled={currentPage === 1}
              >
                ← Previous
              </button>

              <span className="page-number">
                Page {currentPage} of {totalPages}
              </span>

              <button
                className="pagination-button"
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
                disabled={currentPage === totalPages}
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

    {/* FOOTER INSIDE APP */}
    <footer>
      <p>Jhon Lloyd Soco</p>
      <p>Exam-ws101</p>
    </footer>
  </div>
);