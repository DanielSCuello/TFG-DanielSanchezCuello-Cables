import { useEffect, useRef, useState } from "react";
import "./../assets/scss/Temporizador.css";

function Temporizador({ inicialSegundos, reinicio,resuelto, fallado, setFallado, descubierto }) {
  const [timeLeft, setTimeLeft] = useState(inicialSegundos);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(inicialSegundos);
  }, [inicialSegundos]);


  useEffect(() => {
    if (resuelto || timeLeft <= 0) {
      if (timeLeft <= 0 && !fallado) setFallado(true);
      return;
    }
    intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(intervalRef.current);
  }, [resuelto, fallado, timeLeft, setFallado]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setFallado(true);
    }
    if (timeLeft < 0) setTimeLeft(0);
  }, [timeLeft, fallado, setFallado]);
  
  const minutos = Math.floor(timeLeft / 60);
  const segundos = timeLeft % 60;
  const mm = String(minutos).padStart(2, "0");
  const ss = String(segundos).padStart(2, "0");

  const blink = timeLeft % 2 === 0; // parpadeo opcional de los dos puntos

  // Nota: mejor <div> que <h3> si vas a meter <div> hijos dentro
  return (
    <div className={descubierto ? "temporizador-descubierto" : "temporizador"} role="heading" aria-level={3}>
      <div className="digitos-container">
        <div className={`digit digit-${mm[0]}`} />
        <div className={`digit digit-${mm[1]}`} />

        <span className={`colon ${blink ? "on" : "off"}`}>:</span>

        <div className={`digit digit-${ss[0]}`} />
        <div className={`digit digit-${ss[1]}`} />
      </div>
    </div>
  );
}

export default Temporizador;


