import { useState, useEffect } from "react";
import "./../styles/Temporizador.css"; 

function Temporizador({ inicialMinutos ,resuelto ,setResuelto , setFallado ,reinicio}) {
  const [minutos, setMinutos] = useState(inicialMinutos);
  const [segundos, setSegundos] = useState(0);
  const [segundos2, setSegundos2] = useState(0);
  
  useEffect(()=>{
    setMinutos(inicialMinutos);
    setSegundos(0);
    setSegundos2(0);
  },[reinicio])

  useEffect(() => {
    const intervalo = setInterval(() => {
    if(!resuelto){
      if (minutos === 0 && segundos === 0 && segundos2 === 0) {
        setFallado(true);
        clearInterval(intervalo);
      } else if (segundos === 0 && segundos2 === 0) {
        console.log("59");
        setMinutos((prev) => prev - 1);
        setSegundos(5);
        setSegundos2(9);
      } else if(segundos2 === 0){
        console.log("0");
        setSegundos((prev) => prev - 1);
        setSegundos2(9);
      }else{
        setSegundos2((prev) => prev - 1);
      }
    }}, 1000);
    return () => clearInterval(intervalo);
  }, [minutos, segundos, segundos2]);



  return (
    <div>
      <h3 className="clock">{minutos} : {segundos} {segundos2}</h3>
    </div>
  );
}

export default Temporizador;