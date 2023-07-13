
import React from "react";
function HaditsComp(props) {
 console.log(props)
  return (
    <React.Fragment>
    <div className="card">
    <div className="card-header ">
      <table>
      <tr>
        <td> <h5>No. Hadits</h5></td>
        <td><h5>:</h5></td>
        <td>
          <h5>{props.data.No}</h5>
        </td>
      </tr>
      <tr>
        <td><h5>Kitab</h5></td>
        <td><h5>: </h5></td>
        <td>
          <h5>{props.data.Kitab}</h5>
        </td>
      </tr>
      </table>
    </div>
    <div className="card-body bg-primary-subtle">
      <p className="card-text arab">{props.data.Arab}</p>
      <hr />
      <p className="card-text terjemah">{props.data.Terjemah}</p>
    </div>
  </div>
  </React.Fragment>
  );
}

export default HaditsComp;