import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Raspuns from "./Raspuns";
import AddRaspunsForm from "./AddRaspunsForm";
import metode from './MetodeRaspuns'

function ListaRaspunsuri(){
    const params = useParams()
    const [lungime, setLungime] = useState(metode.data.length);
    const [raspunsuri, setRaspunsuri] = useState([]);

    const getRaspunsuri = ()=>{
        metode.getRaspunsuri();
        metode.emitter.addListener('GET_RASPUNSURI_SUCCESS', () => {
            setRaspunsuri(metode.data.filter(e=>e.codActivitate==params.id));
        })
    }


    useEffect(()=>{
        getRaspunsuri();
    },[lungime])

    return(
        <div>
            {
                raspunsuri.map(e=><Raspuns key={e.codRaspuns} item={e}/>)
            }
        </div>
    )
}

export default ListaRaspunsuri;