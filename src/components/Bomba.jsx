import { useState } from "react";
import Modulo from "./Modulo.jsx";
import './../assets/scss/Bomba.css';

function Bomba({ onKeypadSolved, time }) {
  const [reinicio, setReinicio] = useState(false);
  const [descubierto, setDescubierto] = useState(false);

  const reiniciarBomba = () => {
    setReinicio(true);
    setTimeout(() => setReinicio(false), 100);
  };

  // Handler para cuando se hace click en la zona lateral "fondo"
  const handleZonaClick = (e) => {
    // seguridad: evitar cambiar si el click viene de un hijo sobrescrito (no necesario si las zonas son independientes)
    setDescubierto(false);
  };

  return (
    <div className={descubierto ? "bomba-modulo" : "bomba-principal"}>
      {/* Zonas laterales invisibles — solo renderizarlas cuando estamos en modo 'descubierto' */}
      {descubierto && (
        <>
          <div className="bomba-modulo-back-izq"  onClick={handleZonaClick}/>
          <div className="bomba-modulo-back-der"onClick={handleZonaClick}/>
        </>
      )}
       <Modulo reinicio={reinicio} setReinicio={setReinicio} descubierto={descubierto} setDescubierto={setDescubierto} onKeypadSolved={onKeypadSolved} time={time}/>
      <div className={descubierto ? "button-container-modulo" : "button-container-principal"}>
        <div className="button-modulo" onClick={reiniciarBomba}></div>
      </div>
    </div>
  );
}

export default Bomba;
