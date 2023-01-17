import happy from "../../resources/happy.png"
import sad from "../../resources/sad.png"
import confused from "../../resources/confused.png"
import surprised from "../../resources/surprised.png"
import { useState } from "react";

import './Raspuns.css'

function Raspuns(props) {
    const { item } = props;
    const [tipFeedback, setTipFeedBack] = useState('')
    let img;
    if (item.tipFeedback == "fericit") {
        img = happy;
    } else if (item.tipFeedback == "trist") {
        img = sad;
    } else if (item.tipFeedback == "confuz") {
        img = confused;
    } else if (item.tipFeedback == "surprins") {
        img = surprised;
    }

    return (
        <div className="divReactie">
            <div>
                <img src={img} className='reactie'/>
            </div>
            <div>
                <input type='text' className="moment" value={item.moment} disabled/>
            </div>
        </div>
    )
}

export default Raspuns;