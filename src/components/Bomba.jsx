import { useState, useEffect } from "react";
import Modulo from "./Modulo.jsx";
import Mensaje from "./Mensaje.jsx";
import "./../styles/Bomba.css"; 
import { MODULOS_CONFIG } from "../config/config.js";

function Bomba(){
  const [fallado,setFallado] = useState(false);
  const [resuelto,setResuelto] = useState(false);
  const [reinicio, setReinicio] = useState(false);
  const [modulo, setModulos] = useState(MODULOS_CONFIG.modulos.name);



  useEffect(() => {
    console.log(resuelto); 
  }, [resuelto]);

  const reiniciarBomba = () => {
    setResuelto(false);
    setFallado(false);
    setReinicio(true); 
    setTimeout(() => {
      setReinicio(false); 
    }, 100);
  };
  
  return (
    <div className="bomba-container">
      <Mensaje resuelto={resuelto} fallado={fallado}/>
        <div className="bomba">
                <Modulo tipo={modulo} setBombaResuelto={setResuelto}  setBombaFallada={setFallado} reinicio={reinicio}/>
            <div className="button-container">
              <button class="button" onClick={reiniciarBomba}>Reinicio</button>
            </div>
          </div>
      </div>
    );
}

export default Bomba;