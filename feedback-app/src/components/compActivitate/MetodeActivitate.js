import { EventEmitter } from "fbemitter";

const SERVER = 'http://localhost:8080/api'

class MetodeActivitate {
    constructor() {
        this.data = []
        this.emitter = new EventEmitter()
    }

    async getActivitati() {
        try {
            const response = await fetch(`${SERVER}/getActivitati`)
            if(!response.ok) {
                throw response
            }
            this.data = await response.json()
            this.emitter.emit('GET_ACTIVITATI_SUCCESS')
        } catch (err) {
            console.warn(err)
            this.emitter.emit('GET_ACTIVITATI_ERROR')
        }
    }

    async addActivitate(activitate, idProfesor) {
        try {
            const response = await fetch(`${SERVER}/profesori/${idProfesor}/addActivitate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(activitate)
            })

            if(!response.ok) {
                throw response
            }
            this.getActivitati()
        } catch (err) {
            console.warn(err)
            this.emitter.emit('ADD_ACTIVITATE_ERROR')
        }
    }
}

const metodeActivitate = new MetodeActivitate()
export default metodeActivitate