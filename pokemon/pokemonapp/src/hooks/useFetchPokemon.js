import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchPokemon = (searchQuery) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`
        );
        setPokemonData(response.data);
      } catch (err) {
        setError("Falha ao carregar os dados do Pokémon.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  return { pokemonData, loading, error };
};
