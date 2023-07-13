import React from "react";
import { useNavigate } from 'react-router';
import '../style/KitabComp.css'
function KitabComp (props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${props.kitab}`)
  }
    return(
      <div onClick={handleClick} className="card card-kitab">
      <div className="card-body" style={{ width:"100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h5 className="card-title" style={{ position: "absolute", top: 5, left: 5 }}>
          <div className="circle">
            {props.no}
          </div>
        </h5>
        <div className="content">
        <p className="h3">{props.kitab}</p>
        <p className="h6">({props.hadits} hadits) </p>
        </div>
      </div>
    </div>
    

    )
}

export default KitabComp;