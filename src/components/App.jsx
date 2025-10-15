import { useState, useEffect } from 'react';
import Bomba from "./Bomba"; 
import "./../styles/Fondo.css";

import { GLOBAL_CONFIG } from '../config/config.js';
import * as I18n from '../vendors/I18n.js';
import * as LocalStorage from '../vendors/Storage.js';

let escapp;

function App() {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(null);

  useEffect(() => {
    console.log("Inicializando ESCAPP...");

    // Inicialización de I18n y LocalStorage
    I18n.init(GLOBAL_CONFIG);
    LocalStorage.init(GLOBAL_CONFIG.localStorageKey);

    // Callbacks que la API puede invocar
    GLOBAL_CONFIG.escapp.onNewErStateCallback = (er_state) => {
      console.log("Nuevo estado recibido:", er_state);
      setState(er_state);
    };

    GLOBAL_CONFIG.escapp.onErRestartCallback = () => {
      console.log("Reinicio recibido");
      LocalStorage.removeSetting("app_state");
      LocalStorage.removeSetting("played_door");
      setState(null);
    };

    // Crear instancia de la API
    escapp = new ESCAPP(GLOBAL_CONFIG.escapp);

    // Validar conexión
    escapp.validate((success, er_state) => {
      console.log("ESCAPP validation", success, er_state);
      try { 
        if(success){
          //ha ido bien, restauramos el estado recibido
          restoreState(er_state);
        }
      } catch(e){
        console.error(e);
      }
    });

  }, []);

  // Funciones útiles para lanzar acciones desde la app
  function trySolution(sol) {
    if (!sol) return;
    escapp.checkPuzzle(GLOBAL_CONFIG.escapp.puzzleId, sol, {}, (success) => {
      if (success) {
        console.log("¡Puzzle resuelto!");
      } else {
        console.log("Solución incorrecta");
      }
    });
  }

  function resetApp() {
    escapp.reset();
    localStorage.clear();
    setState(null);
  }

 

  return (
    <div className="tablero-container">      
      <Bomba />
    </div>
  );
}

export default App;

