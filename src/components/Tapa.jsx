
import { useState } from "react";
import "./../styles/Tapa.css";

function Tapa({setDescubierto}) {
  return (
    <div className="tapa" onClick={()=>setDescubierto(true)}>
    </div>
  );
}

export default Tapa;