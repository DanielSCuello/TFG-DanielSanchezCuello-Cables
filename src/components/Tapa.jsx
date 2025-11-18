import { useState , useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/Tapa.css';

function Tapa({setDescubierto}) {
  const {escapp, appSettings, Utils} = useContext(GlobalContext);
  const [animado, setAnimado] = useState(false);

  const animacionTapa = () => {
    const img = document.getElementById("image");
    if (!img) return;

    img.addEventListener("click", function () {
      this.classList.add("falling");
    });
  };
  
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  async function descubrirTapa (){
    setAnimado(true);
    await wait(1200);
    setDescubierto(true);
  }

  return (
    <div className={`cables-borrosos-${appSettings.numberOfWires}`}><div className={`tapa${animado ? "-fall" : ""}`} onClick={() => {descubrirTapa(); animacionTapa();}} tabIndex="0" ></div></div>
  );
}

export default Tapa;