import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import metode from '../compRaspuns/MetodeRaspuns'

import './Activitate.css'
function Activitate(props) {
    const { item } = props

    const navigate = useNavigate();
    const [raspunsuri, setRaspunsuri] = useState([]);

    useEffect(() => {
        metode.getRaspunsuri();
        metode.emitter.addListener('GET_RASPUNSURI_SUCCESS', () => {
             setRaspunsuri(metode.data.filter(x => x.codActivitate == item.codActivitate))
        })
    }, [])

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>{item.codActivitate}</td>
                        <td>{item.descriere}</td>
                        <td>{item.start}</td>
                        <td>{item.stop}</td>
                        <td>{raspunsuri.length}</td>
                        <td>
                            <input type="button" className="btnVeziRaspunsuri" value="Vezi răspunsuri" onClick={() => { navigate(`/${item.codActivitate}/reactii`); }} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Activitate