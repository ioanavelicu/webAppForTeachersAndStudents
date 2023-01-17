import { useState } from "react";

import happy from "../../resources/happy.png"
import sad from "../../resources/sad.png"
import confused from "../../resources/confused.png"
import surprised from "../../resources/surprised.png"

import './AddRaspunsForm.css'
import { useParams } from "react-router-dom";

function AddRaspunsForm(props) {
    const { onAdd } = props
    const [tipFeedback, setTipFeedback] = useState('')

    const params = useParams()

    const add = (e) => {
        onAdd({
            tipFeedback
        })
    }

    return (
        <div>
            <div>
                <textarea rows='2' className="addRapunsText" value={`Adaugă un raspuns la activitatea ${params.codActivitate}`} disabled />
                <textarea rows='2' className="indicatii" value='Dați click pe răspunsul dorit și apoi apăsați pe buton' disabled/>
            </div>
            <div className="raspunsuriLinia1">
                <img id='fericit' className="raspuns" src={happy} onClick={(e) => setTipFeedback(e.target.id)}></img>
                <img id='trist' className="raspuns" src={sad} onClick={(e) => setTipFeedback(e.target.id)}></img>
            </div>
            <div className="raspunsuriLinia2">
                <img id='confuz' className="raspuns" src={confused} onClick={(e) => setTipFeedback(e.target.id)}></img>
                <img id='surprins' className="raspuns" src={surprised} onClick={(e) => setTipFeedback(e.target.id)}></img>
            </div>
            <div>
                <input type='button' className="btnAddRaspuns" value='Adaugă răspuns' onClick={add} />
            </div>
        </div>
    )
}

export default AddRaspunsForm