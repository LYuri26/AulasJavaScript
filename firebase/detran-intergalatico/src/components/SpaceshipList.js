// src/components/SpaceshipList.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const SpaceshipList = () => {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpaceships = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "spaceships"));
        const spaceshipList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSpaceships(spaceshipList);
      } catch (error) {
        setError("Erro ao buscar espaçonaves: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaceships();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Espaçonaves Apreendidas</h2>
      {spaceships.length > 0 ? (
        <ul>
          {spaceships.map((spaceship) => (
            <li key={spaceship.id}>
              <strong>{spaceship.name}</strong> - {spaceship.model} (
              {spaceship.year}) - Status: {spaceship.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma espaçonave cadastrada.</p>
      )}
    </div>
  );
};

export default SpaceshipList;
