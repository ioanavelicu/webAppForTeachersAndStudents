import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080/api'

class MetodeStudent {
    constructor () {
        this.data = [];
        this.emitter = new EventEmitter()
    }

    async getStudenti() {
        try {
            const response = await fetch(`${SERVER}/getStudenti`)
            if (!response.ok) {
                throw response
            }
            this.data = await response.json()
            this.emitter.emit('GET_STUDENT_SUCCESS')
        } catch (err) {
            console.warn(err) 
            this.emitter.emit('GET_STUDENT_ERROR')
        }
    }

    async addStudent(nume, mail, parola) {
        try {
            const response = await fetch(`${SERVER}/addStudent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nume: nume, mail: mail, parola:parola})
            })
            if (!response.ok) {
                throw response
            }
            this.getStudenti();
        } catch (err) {
            console.warn(err)
            this.emitter.emit('ADD_STUDENT_ERROR')
        }
    }
}

const metodeStudent = new MetodeStudent();
export default metodeStudent;