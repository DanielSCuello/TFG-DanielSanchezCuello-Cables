import { useEffect, useState } from "react";
import "./../styles/Modulo.css";
import Temporizador from "./Temporizador.jsx";
import Cables from "./ModuloCables.jsx";
import Tapa from "./Tapa.jsx" 

function Modulo({reinicio ,setBombaFallada,setBombaResuelto}) {
  const [resuelto, setResuelto] = useState(false);
  const [fallado, setFallado] = useState(false);
  const [descubierto, setDescubierto] = useState(false);

  useEffect(() => {
    setBombaResuelto(resuelto);
  },[resuelto]);

  useEffect(() => {
    setBombaFallada(fallado);
  },[fallado]);
  

  useEffect(()=>{
    setResuelto(false);
    setFallado(false);
  },[reinicio])

  return (
    <div className="modulo">
      <div className={fallado ? "luz-roj" : resuelto ? "luz-ver" : "luz-apa"}/>
        <Temporizador inicialMinutos={1} resuelto={resuelto} setFallado={setFallado} fallado={fallado} reinicio={reinicio}/>
        {descubierto ? <Cables setResuelto={setResuelto} fallado={fallado} setFallado={setFallado} reinicio={reinicio}/> : <Tapa setDescubierto={setDescubierto} descubierto={descubierto}/>}
    </div>
  );
}

export default Modulo;

