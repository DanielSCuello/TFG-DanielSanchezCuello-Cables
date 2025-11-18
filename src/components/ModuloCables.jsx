import { useState, useEffect, useContext } from "react";
import "./../assets/scss/Cables.css";
import { GlobalContext } from "./GlobalContext";
import Cable from "./Cable.jsx";

function Cables({ fallado, reinicio, setSolution, solutionActual, setSolutionActual }) {
  const { appSettings, Utils } = useContext(GlobalContext);
  const activeColorsCount = appSettings.numberOfWires;
  const activeColorsInitial = appSettings.colors.slice(0, activeColorsCount);

  // Estado interno del módulo
  const [orden, setOrden] = useState(1);
  const [cables, setCables] = useState(
    activeColorsInitial.map((color, index) => ({
      id: index + 1,
      color,
      cortado: false,
    }))
  );
  const [cablesCortados, setCablesCortados] = useState([]);

  const cortarCable = (id) => {
    if (fallado) return;

    setCables((prevCables) =>
      prevCables.map((cable) => {
        if (cable.id === id && !cable.cortado) {
          const nextOrden = orden + 1;
          setOrden(nextOrden);

          setCablesCortados((prev) =>
            prev.includes(id) ? prev : [...prev, id]
          );

          return { ...cable, cortado: true };
        }
        return cable;
      })
    );
  };


  useEffect(() => {
    if (setSolutionActual) {
      setSolutionActual(cablesCortados);
    }
    if (cablesCortados.length > 0) {
      Utils.log("Secuencia actual (nº de cable):", cablesCortados);
      if (cablesCortados.length >= appSettings.solutionLength) {
        const solution = cablesCortados.join(";");
        setSolution(solution);
      }
    }
  }, [cablesCortados, setSolutionActual, setSolution, Utils, appSettings.solutionLength]);

  useEffect(() => {
    if (!solutionActual || !Array.isArray(solutionActual) || solutionActual.length === 0) {
      return;
    }
    Utils.log("Restaurando cables cortados desde solutionActual:", solutionActual);
    setCables((prevCables) =>
      prevCables.map((cable) => ({
        ...cable,
        cortado: solutionActual.includes(cable.id),
      }))
    );
    setCablesCortados(solutionActual);
    setOrden(solutionActual.length + 1);
  }, [solutionActual, Utils]);

  useEffect(() => {
    if (!reinicio) return;

    Utils.log("🔁 Reiniciando módulo de cables...");

    setOrden(1);
    setCablesCortados([]);
    setCables((prev) => prev.map((c) => ({ ...c, cortado: false })));

    if (setSolutionActual) {
      setSolutionActual([]);
    }
  }, [reinicio, setSolutionActual, Utils]);

  return (
    <div className="cables-container">
      {cables.map((cable) => (
        <Cable key={cable.id} color={cable.color} cortado={cable.cortado} onCortar={() => cortarCable(cable.id)}/>
      ))}
    </div>
  );
}

export default Cables;
