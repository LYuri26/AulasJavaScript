import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ regions }) => {
  return (
    <div className="pokemon-list">
      {regions.map((region, index) => (
        <div key={index} className="region">
          <h3>{region.name}</h3>
          {region.pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
