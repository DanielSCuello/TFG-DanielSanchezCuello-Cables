
import { useState } from "react";
import "./../styles/Cables.css";

function Cable({color, cortado, onCortar}) {
  const [hover, setHover] = useState(false);

  return (
    <div>
      <div className={cortado ? "cable-cor" : `cable-${color}`}onClick={!cortado ? onCortar : null} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {hover && <img className="cable-resp" />}
      </div>
    </div>
  );
}

export default Cable;