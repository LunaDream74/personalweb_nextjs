import { useState } from 'react';

function Pokedex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Core function to fetch Pokémon data
  const fetchPokemon = async (identifier) => {
    setLoading(true);
    setError(null);
    setPokemon(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
      if (!response.ok) {
        throw new Error('Pokémon not found!');
      }
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchPokemon(searchTerm.toLowerCase().trim());
    }
  };

  const handlePrev = () => {
    if (pokemon && pokemon.id > 1) {
      fetchPokemon(pokemon.id - 1);
    }
  };

  const handleNext = () => {
    if (pokemon) {
      fetchPokemon(pokemon.id + 1);
    }
  };

  // Helper to format name
  const formatName = (name) => name.charAt(0).toUpperCase() + name.slice(1);
  
  // Helper to get sprite
  const getSprite = (data) => {
    return data.sprites.other['showdown'].front_default || 
           data.sprites.other['official-artwork'].front_default;
  };

  return (
    <section id="pokedex" className="section container" aria-labelledby="pokedex-title">
      <h2 id="pokedex-title" className="section-title">Pokedex</h2>

      <form id="pokemonSearchForm" className="pokedex-form" onSubmit={handleSearch}>
        <input
          type="text"
          id="pokemonNameInput"
          placeholder="Enter a Pokémon name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div id="pokemonResult" className="pokemon-result-container">
        {/* Helper Text */}
        {!pokemon && !error && !loading && (
          <p id="pokemonHelperText">Search for a Pokémon to see its sprite here.</p>
        )}

        {/* Error Message */}
        {error && (
          <p id="pokemonErrorText" className="error-message">
            {error}
          </p>
        )}

        {/* Loading Spinner (optional) */}
        {loading && <p>Loading...</p>}

        {/* Pokemon Display */}
        {pokemon && (
          <div id="pokemonDisplay">
            <h3 id="pokemonNameEl">{formatName(pokemon.name)}</h3>
            <div className="sprite-navigation">
              <button
                id="prevPokemonBtn"
                className="nav-btn"
                aria-label="Previous Pokémon"
                onClick={handlePrev}
                disabled={pokemon.id === 1}
              >
                &lt;
              </button>
              <img
                id="pokemonSpriteEl"
                className="pokemon-sprite"
                src={getSprite(pokemon)}
                alt={`Image of ${formatName(pokemon.name)}`}
              />
              <button
                id="nextPokemonBtn"
                className="nav-btn"
                aria-label="Next Pokémon"
                onClick={handleNext}
              >
                &gt;
              </button>
            </div>
            {pokemon.cries.latest && (
              <audio id="pokemonCryEl" src={pokemon.cries.latest} controls />
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Pokedex;