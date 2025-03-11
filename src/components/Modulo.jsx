import { useEffect, useState } from "react";
import "./../styles/Modulo.css";
import Cables from "./ModuloCables.jsx"; 

function Modulo({ tipo ,reinicio ,setBombaFallada,setBombaResuelto}) {
  const [resuelto, setResuelto] = useState(false);
  const [fallado, setFallado] = useState(false);

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
        {tipo === "cables" && <Cables setResuelto={setResuelto} fallado={fallado} setFallado={setFallado} reinicio={reinicio}/>}
    </div>
  );
}

export default Modulo;

