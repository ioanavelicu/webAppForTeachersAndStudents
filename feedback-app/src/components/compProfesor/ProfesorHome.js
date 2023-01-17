import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListaActivitati from "../compActivitate/ListaActivitati";

function ProfesorHome(){

    return(
        <div>
            <ListaActivitati/>
        </div>
    )
}

export default ProfesorHome;