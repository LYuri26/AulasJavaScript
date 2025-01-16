import React, { useState } from "react";

const PokemonSearch = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = searchInput.trim().toLowerCase();

    // Verifique se o nome inclui uma variação, como "Alola"
    if (searchTerm.includes("alola")) {
      const pokemonName = searchTerm.replace(" alola", ""); // Remove "Alola" da busca
      onSearch(`${pokemonName}-alola`); // Passe a variação ao fazer a pesquisa
    } else {
      onSearch(searchTerm); // Pesquise apenas pelo nome padrão
    }
  };

  return (
    <div className="pokemon-search">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Digite o nome do Pokémon (Ex: Dugtrio Alola)"
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default PokemonSearch;
