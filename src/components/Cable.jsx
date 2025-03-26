
import { useState } from "react";
import "./../styles/Cables.css";

function Cable({color, cortado, onCortar}) {

  return (
      <div className={cortado ? `cable-cor-${color}` : `cable-${color}`}onClick={!cortado ? onCortar : null}>
      </div>
  );
}

export default Cable;