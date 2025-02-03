// src/App.js
import React from "react";
import SpaceshipForm from "./components/SpaceshipForm";
import SpaceshipList from "./components/SpaceshipList";

const App = () => {
  return (
    <div>
      <h1>Detran Intergaláctico</h1>
      <SpaceshipForm />
      <SpaceshipList />
    </div>
  );
};

export default App;
