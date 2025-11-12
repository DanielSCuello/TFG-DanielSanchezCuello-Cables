import { useState, useEffect } from "react";
import './../assets/scss/Cables.css';
import Cable from "./Cable.jsx";

function Cables({ fallado, reinicio, setSolucion, numCables }) {
  // Lista maestra (orden visual / lógica). Puedes cambiar el contenido o el orden.
  const ALL_COLORS = [
    "red",
    "blue",
    "green",
    "yellow",
    "pink",
    "grey",
    "orange",
    "black"
  ];

  // Longitud por defecto de la solución (puedes exponer esto como prop si lo necesitas)
  const SOLUTION_LENGTH = 4;

  // Computamos colores activos según numCables (entre 1 y ALL_COLORS.length)
  const requested = typeof numCables === "number" && numCables > 0 ? numCables : ALL_COLORS.length;
  const activeColorsCount = Math.min(requested, ALL_COLORS.length);
  const activeColorsInitial = ALL_COLORS.slice(0, activeColorsCount);

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
    console.log("NumCables NumCables Cales:", numCables);
    console.log("Cables Cables Cales:", cables);
  }, [cables]);

  useEffect(() => {
    if (cablesCortados.length > 0) {
      const secuencia = cablesCortados.join("-");
      console.log("Secuencia actual:", secuencia);
    }
  }, [cablesCortados]);

  useEffect(() => {
    if (orden === cables.length + 1) {
      const secuenciaFinal = cablesCortados.join(";");
      setSolucion(secuenciaFinal);
      console.log("💣 Puzzle resuelto. Secuencia final:", secuenciaFinal);
    }
  }, [orden]);


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


