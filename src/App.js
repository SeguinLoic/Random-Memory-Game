import React, { useState } from 'react';
import './App.css';

import { FaHeart } from "react-icons/fa";

import FormSearch from "./components/Header/FormSearch"
import BoardGame from "./components/Board/BoardGame"

function App() {

  const [photos, setPhotos] = useState([]);
  const [partie, setPartie] = useState(false);

  return (
    <div className="App">
      <div className="container-app">
        <h1>Random Memory Game</h1>
        {
          !partie ? 
          <FormSearch setPhotos={setPhotos} setPartie={setPartie} /> : 
          <BoardGame photos={photos} setPartie={setPartie} setPhotos={setPhotos} />
        }
        <div className="signature">Fait avec <FaHeart /> par <a href="https://github.com/SeguinLoic" target="_blank" rel="noreferrer">Loïc Seguin</a></div>
      </div>
    </div>
  );
}

export default App;
