import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import metodeActivitate from '../compActivitate/MetodeActivitate'
import Activitate from "./Activitate";
import AddActivitateForm from '../compActivitate/AddActivitateForm'
import './ListaActivitati.css'

function ListaActivitati() {
    const params = useParams()
    const [activitati, setActivitati] = useState([])

    useEffect(() => {
        metodeActivitate.getActivitati()
        metodeActivitate.emitter.addListener('GET_ACTIVITATI_SUCCESS', () => {
            setActivitati(metodeActivitate.data.filter(e => e.idProfesor == params.id))
            console.log(activitati);
        })
    }, [])

    const addActivitate = (activitate) => {
        metodeActivitate.addActivitate(activitate, params.id)
    }

    return (
        <div>
            <div>
                <AddActivitateForm onAdd={addActivitate} />
            </div>
            <div>
                <table>
                    <caption>Listă activități</caption>
                    <thead>
                        <tr>
                            <th>Cod activitate</th>
                            <th>Descriere</th>
                            <th>Dată început</th>
                            <th>Dată sfârșit</th>
                            <th>Număr răspunsuri</th>
                            <th>Listă răspunsuri</th>
                        </tr>
                    </thead>
                </table>
                {
                    activitati.map(e => <Activitate key={e.codActivitate} item={e} />)
                }
            </div>
        </div>
    )
}

export default ListaActivitati;