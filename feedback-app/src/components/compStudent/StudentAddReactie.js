import { useParams, useNavigate } from "react-router-dom"

import metode from '../compRaspuns/MetodeRaspuns'

import AddRaspunsForm from "../compRaspuns/AddRaspunsForm"

function StudentAddReactie(){
    const params = useParams();
    const navigate = useNavigate();

    const addRaspuns = (raspuns) => {
        metode.addRaspuns(raspuns, params.id, params.codActivitate)
        alert("Reactie salvata")
        navigate(`/student/${params.id}`)
    }

    return(
        <div>
            <AddRaspunsForm onAdd={addRaspuns}/>
        </div>
    )
}

export default StudentAddReactie;