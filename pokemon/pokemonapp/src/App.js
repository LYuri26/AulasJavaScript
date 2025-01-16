import React, { useState } from "react";
import { useFetchPokemon } from "./hooks/useFetchPokemon";
import PokemonCard from "./components/PokemonCard";
import PokemonSearch from "./components/PokemonSearch";
import "./styles/theme.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { pokemonData, loading, error } = useFetchPokemon(searchQuery);

  return (
    <div className="App">
      <h1>Pokémon Finder</h1>
      <PokemonSearch onSearch={setSearchQuery} />
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {pokemonData && <PokemonCard pokemon={pokemonData} />}
    </div>
  );
};

export default App;
