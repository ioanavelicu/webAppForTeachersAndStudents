import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080/api'

class MetodeRaspuns {
    constructor () {
        this.data = []
        this.emitter = new EventEmitter()
    }

    async getRaspunsuri() {
        try {
            const response = await fetch(`${SERVER}/getRaspunsuri`)
            if (!response.ok) {
                throw response
            }
            this.data = await response.json()
            this.emitter.emit('GET_RASPUNSURI_SUCCESS')
        } catch (err) {
            console.warn(err) 
            this.emitter.emit('GET_RASPUNSURI_ERROR')
        }
    }

    async addRaspuns(raspuns, idStudent, codActivitate) {
        try {
            const response = await fetch(`${SERVER}/addRaspuns/${idStudent}/${codActivitate}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(raspuns)
            })
            if (!response.ok) {
                throw response
            }
            this.getRaspunsuri()
        } catch (err) {
            console.warn(err)
            this.emitter.emit('ADD_RASPUNS_ERROR')
        }
    }
}

const metode = new MetodeRaspuns()
export default metode