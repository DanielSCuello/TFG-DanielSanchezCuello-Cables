import {useState, useEffect, useContext } from 'react';
import './../assets/scss/Cables.css';
import { GlobalContext } from "./GlobalContext";
import Cable from "./Cable.jsx";

function Cables({ fallado, reinicio, setSolution }) {
  const { appSettings, Utils} = useContext(GlobalContext);
  const activeColorsCount = appSettings.numberOfWires;
  const activeColorsInitial = appSettings.colors.slice(0, activeColorsCount);

  // Estado
  const [orden, setOrden] = useState(1);
  const [cables, setCables] = useState(
    activeColorsInitial.map((color) => ({ color, cortado: false }))
  );
  const [cablesCortados, setCablesCortados] = useState([]);


  const cortarCable = (color) => {
    if (fallado) return;

    setCables((prevCables) =>
      prevCables.map((cable) => {
        if (cable.color === color && !cable.cortado) {
          const nextOrden = orden + 1;
          setOrden(nextOrden);

          setCablesCortados((prev) =>
            prev.includes(color) ? prev : [...prev, color]
          );

          return { ...cable, cortado: true };
        }
        return cable;
      })
    );
  };

  useEffect(() => {
    if (cablesCortados.length > 0) {
      Utils.log("Secuencia actual:", cablesCortados);
      if(cablesCortados.length >= appSettings.solutionLength){
        const solution = cablesCortados.join(";");
        setSolution(solution);
      }
    }
  }, [cablesCortados]);

  useEffect(() => {
    console.log("🔁 Reiniciando módulo...");
    setOrden(1);
    setCablesCortados([]);
    setCables((prev) => prev.map((c) => ({ ...c, cortado: false })));
  }, [reinicio]);

  return (
    <div className="cables-container">
      {cables.map((cable) => (
        <Cable key={cable.color} color={cable.color}  cortado={cable.cortado} onCortar={() => cortarCable(cable.color)}/>
      ))}
    </div>
  );
}

export default Cables;