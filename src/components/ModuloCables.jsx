import { useState, useEffect } from "react";
import './../assets/scss/Cables.css';
import Cable from "./Cable.jsx";

function Cables({setResuelto , fallado ,setFallado , reinicio}) {
  const arraySol = ["roj","azu","ver","ama"];
  const[orden,setOrden]=useState(1);
  const [cables, setCables] = useState([
    {color: "roj"},
    {color: "azu"},
    {color: "ver"},
    {color: "ama"},
  ]);
  
  const cortarCable = (color) => {
    setCables((prevCables) =>
      prevCables.map((cable) =>{
        if (cable.color === color && !fallado) {
          ordenCables(cable)
          return { ...cable, cortado: true }; 
        }
        return cable
      })
    );
  };

  const ordenCables = (cable) => {
    setOrden(orden+1)
    if (orden !== cable.orden) {
      setFallado(true);
    }
  };

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() })) 
      .sort((a, b) => a.sort - b.sort) 
      .map(({ item }) => item); 
  };

  useEffect(() => {
    if (orden===arraySol.length+1) {
      setResuelto(true);
      console.log("Todos los cables que tienen 'cortado' están en true.");
    }
  }, [cables]);
  

  useEffect(() => {
    setCables((prevCables) => 
      prevCables.map((cable) => {
        let index = arraySol.indexOf(cable.color);
        if (index !== -1) {
          return { ...cable, orden: index + 1 , cortado:false }; 
        }
        return cable;
      })
    );
  }, [])

  useEffect(() => {
    console.log(arraySol);
    setCables((cables) =>
      shuffleArray(
        cables.map((cable) => {
          return { ...cable, cortado: false };
        })
      )
    );
    setOrden(1);
  }, [reinicio]);

  return (
    <div className="cables-container">
      {cables.map((cable) => (
        <Cable  color={cable.color} cortado={cable.cortado} onCortar={() => cortarCable(cable.color)}/>
      ))}
    </div>
  );
}

export default Cables;


