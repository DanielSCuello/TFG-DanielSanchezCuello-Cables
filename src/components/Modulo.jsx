import { useEffect, useState } from "react";
import "./../styles/Modulo.css";
import Temporizador from "./Temporizador.jsx";
import Cables from "./ModuloCables.jsx";
import Tapa from "./Tapa.jsx" 

function Modulo({reinicio,fallado ,setFallado,resuelto,setResuelto, descubierto,setDescubierto}) {

  return (
    <div className={descubierto ? "modulo-descubierto":"modulo"}>
      <div className={fallado ? `luz-roj${descubierto ? "" : "-principal"}` : resuelto ? `luz-ver${descubierto ? "" : "-principal"}` : `luz-apa${descubierto ? "" : "-principal"}`}/>
      <Temporizador inicialMinutos={1} resuelto={resuelto} setFallado={setFallado} fallado={fallado} reinicio={reinicio} descubierto={descubierto}/>
      <div className="tapa-container">
        {descubierto ? <Cables setResuelto={setResuelto} fallado={fallado} setFallado={setFallado} reinicio={reinicio}/> : <Tapa setDescubierto={setDescubierto} descubierto={descubierto}/>}
      </div>
    </div>
  );
}

export default Modulo;

