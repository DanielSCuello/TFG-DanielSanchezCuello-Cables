import { useState, useEffect } from "react";
import Bomba from "./Bomba"; 
import "./../styles/Fondo.css"; 

function App() {
  return (
    <div className="tablero-container">
      <Bomba/>
    </div>
  );
}

export default App;