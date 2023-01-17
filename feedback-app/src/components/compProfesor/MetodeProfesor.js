import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080/api'

class MetodeProfesor {
    constructor () {
        this.data = []
        this.emitter = new EventEmitter()
    }

    async getProfesori() {
        try {
            const response = await fetch(`${SERVER}/getProfesori`)
            if (!response.ok) {
                throw response
            }
            this.data = await response.json()
            this.emitter.emit('GET_PROFESORI_SUCCESS')
        } catch (err) {
            console.warn(err) 
            this.emitter.emit('GET_PROFESOR_ERROR')
        }
    }

    async addProfesor(nume, mail, parola) {
        try {
            const response = await fetch(`${SERVER}/addProfesor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nume:nume, mail:mail, parola:parola})
            })
            if (!response.ok) {
                throw response
            }
            this.getProfesori()
        } catch (err) {
            console.warn(err)
            this.emitter.emit('ADD_PROFESOR_ERROR')
        }
    }
}

const metodeProfesor = new MetodeProfesor();
export default metodeProfesor;