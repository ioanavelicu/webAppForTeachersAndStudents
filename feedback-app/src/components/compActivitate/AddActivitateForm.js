import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import './AddActivitateForm.css'

function AddActivitateForm(props) {
    const navigate = useNavigate();

    const { onAdd } = props

    const [descriere, setDescriere] = useState('')
    const [start, setStart] = useState('')
    const [stop, setStop] = useState('')
    const params = useParams()

    let startDate, stopDate
    let testDate = new Date();

    const add = (e) => {
        if (stop === "") {
            alert("Nu ați introdus data de sfârșit")
        } else if (start === "") {
            startDate = new Date();
            stopDate = new Date(stop)

            if (startDate >= stopDate) {
                alert("Data introdusă nu are sens")
            } else {
                onAdd({
                    descriere,
                    stop
                })
                alert("Activitate inserată")
            }
        } else {
            startDate = new Date(start)
            if (startDate !== "Invalid Date" && startDate >= testDate) {
                stopDate = new Date(stop)
                if (stopDate !== "Invalid Date") {
                    if (startDate >= stopDate) {
                        alert("Data introdusă nu are sens")
                    } else {
                        onAdd({
                            descriere,
                            start,
                            stop
                        })
                        alert("Activitate inserată")
                    }
                } else alert("Dată sfârșit invalidă")
            } else alert("Dată început invalidă")
        }
    }

    return (
        <div>
            <div>
                <input type='text' className="addActivitateText" value='Adaugă o activitate' disabled />
                <input type='text' className="id-profesor" value={`Profesorul cu id-ul ${params.id}`} disabled />
            </div>
            <div>
                <textarea rows='1' className="indicatie" value='Data are formatul: an-lună-zi' disabled />
                <input type='text' className="addActivitateForm" placeholder='start activitate (implicit = momentul curent)' onChange={(e) => setStart(e.target.value)} />
                <input type='text' className="addActivitateForm" placeholder="descriere" onChange={(e) => setDescriere(e.target.value)} />
                <input type='text' className="addActivitateForm" placeholder="oprește activitatea" onChange={(e) => setStop(e.target.value)} />
            </div>
            <div>
                <input type='button' className="btnAddActivitate" value='Adaugă activitate' onClick={add} />
                <input type='button' className="btnHome" value='Log Out' onClick={() => { navigate("/") }} />
            </div>
        </div>
    )
}

export default AddActivitateForm