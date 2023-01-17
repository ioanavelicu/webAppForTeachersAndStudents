import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import metodeActivitate from "../compActivitate/MetodeActivitate";
import metodeStudent from "./MetodeStudent";
import ActivitateStudent from './ActivitateStudent'

import './StudentHome.css'

function StudentHome() {

  //CAND SE LOGHEAZA UN STUDENT APARE LISTA CU ACTIVITATI SI DESCRIERILE LOR

  const navigate = useNavigate();
  const params = useParams();
  const inputRef = useRef(null);
  const [activitati, setActivitati] = useState([]);
  const [studenti, setStudenti] = useState([]);
  let stopActivitate, startActivitate;
  useEffect(() => {
    metodeActivitate.getActivitati();
    metodeActivitate.emitter.addListener("GET_ACTIVITATI_SUCCESS", () => {
      setActivitati(metodeActivitate.data);
    })

    metodeStudent.getStudenti();
    metodeStudent.emitter.addListener('GET_STUDENT_SUCCESS', () => {
      setStudenti(metodeStudent.data)
    })
  }, [])

  const clickHandle = async (evt) => {
    let activitate = activitati.find(e => e.codActivitate == inputRef.current.value);
    if (activitate) {
      let curent = new Date();
      startActivitate = new Date(activitate.start);
      stopActivitate = new Date(activitate.stop);
      if (curent > stopActivitate) {
        alert("Activitatea s-a încheiat")
      } else if (curent < startActivitate) {
        alert("Activitatea nu a început încă")
      } else {
        navigate(`${activitate.codActivitate}/reactie`)
      }
    } else {
      alert("Activitatea nu există");
    }
  }

  return (
    <div>
      <input type='text' className='student_id' value={`Studentul ${params.id}`} disabled />
      <input type='text' className="insertCodActivitate" ref={inputRef} placeholder="Introduceți codul activității" />
      {/* get activitate dupa id */}
      <input type='button' className="btnRaspunde" value="Răspunde" onClick={clickHandle} />
      <input type='button' className="btnHome" value='Log Out' onClick={() => { navigate("/") }} />
      <textarea rows='1' className="indicatieStudent" value='Data are formatul: an-lună-zi' disabled />
      <div>
      </div>
      <div className="listaActivitati">
        <table>
          <caption>Listă activități</caption>
          <thead>
            <tr>
              <th>Cod activitate</th>
              <th>Descriere</th>
              <th>Dată început</th>
              <th>Dată sfârșit</th>
            </tr>
          </thead>
        </table>
        {
          activitati.map(e => <ActivitateStudent key={e.codActivitate} item={e} />)
        }
      </div>
    </div>
  );
}

export default StudentHome;