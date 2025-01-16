import React from "react";
import "../styles/PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  // Verifique se pokemon e seus dados principais existem
  if (!pokemon) {
    return <p>Pokémon não encontrado.</p>;
  }

  if (!pokemon.sprites || !pokemon.sprites.front_default) {
    return <p>Imagem do Pokémon não disponível.</p>;
  }

  return (
    <div className="pokemon-card">
      <h2>{pokemon.name}</h2>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-image"
      />
      <div>
        <p>
          <strong>Tipo:</strong>{" "}
          {pokemon.types.map((type) => type.type.name).join(", ")}
        </p>
        <p>
          <strong>ID:</strong> #{pokemon.id}
        </p>
        {/* Habilidades */}
        <p>
          <strong>Habilidades:</strong>{" "}
          {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
        </p>
        {/* Estatísticas */}
        <div>
          <strong>Estatísticas:</strong>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
        {/* Verificando variações regionais */}
        {pokemon.forms && pokemon.forms.length > 1 && (
          <p>
            <strong>Variações Regionais:</strong>{" "}
            {pokemon.forms.map((form) => form.name).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
