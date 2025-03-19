import { useState, useEffect } from "react";
import Modulo from "./Modulo.jsx";
import Mensaje from "./Mensaje.jsx";
import "./../styles/Bomba.css"; 
import { MODULOS_CONFIG } from "../config/config.js";

function Bomba(){
  const [fallado,setFallado] = useState(false);
  const [resuelto,setResuelto] = useState(false);
  const [reinicio, setReinicio] = useState(false);
  const [descubierto, setDescubierto] = useState(false);
  const modulo= MODULOS_CONFIG.modulos.name;



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
    <div className={descubierto ?"bomba-modulo":"bomba-principal"}>
      <Modulo tipo={modulo} reinicio={reinicio} resuelto={resuelto} setResuelto={setResuelto} fallado={fallado} setFallado={setFallado} descubierto={descubierto} setDescubierto={setDescubierto}/>
        <div className="button-container">
          <button className={descubierto ?"button-modulo":"button-principal"} onClick={reiniciarBomba}>Reinicio</button>
        </div>
      </div>
    );
}

export default Bomba;