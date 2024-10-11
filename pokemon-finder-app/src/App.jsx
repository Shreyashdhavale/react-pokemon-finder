import { useState, useEffect } from "react";
import "./App.css";
import { FaSearch } from "react-icons/fa";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20"
      );
      const data = await response.json();

      const fetchPokemonData = async () => {
        const pokemonDataPromises = data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const pokemonDetails = await response.json();

          return {
            name: pokemonDetails.name,
            image: pokemonDetails.sprites.front_default,
          };
        });

        const details = await Promise.all(pokemonDataPromises);
        setPokemonList(details);
      };

      fetchPokemonData();
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="search-navbar">
        <div className="searchBox">
          <input
            type="text"
            placeholder="Search Pokemon..."
            className="searchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="searchIcon" />
        </div>
      </div>
      <div className="pokemon-Card-container">
        <div className="inside-pokemon-container">
          {filteredPokemon.map((pokemon, index) => (
            <div key={index} className="pokemonCard">
              <div className="image-container">
                <img src={pokemon.image} alt={pokemon.name} />
              </div>
              <p>{pokemon.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
