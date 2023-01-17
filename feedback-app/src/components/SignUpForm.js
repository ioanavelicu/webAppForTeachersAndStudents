import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import metodeStudent from "./compStudent/MetodeStudent";
import metodeProfesor from "./compProfesor/MetodeProfesor";

import './SignUpForm.css'

function SignUpForm() {


  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const navigate = useNavigate();
  const [studenti, setStudenti] = useState([]);
  const [profesori, setProfesori] = useState([]);
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [nume, setNume] = useState("");


  useEffect(() => {
    metodeStudent.getStudenti();
    metodeStudent.emitter.addListener("GET_STUDENT_SUCCESS", () => {
      setStudenti(metodeStudent.data);
    })

    metodeProfesor.getProfesori();
    metodeProfesor.emitter.addListener("GET_PROFESORI_SUCCESS", () => {
      setProfesori(metodeProfesor.data);
    })
  }, [])

  const clickStud = (evt) => {
    let index = studenti.findIndex(e => e.mail == email)
    if (index === -1) {
      if (email.match(validRegex)) {
        metodeStudent.addStudent(nume, email, parola)
        alert("Cont creat cu succes")
        window.location='/'
      } else {
        alert("Email invalid");
      }
    } else {
      alert("Exista deja un cont pentru aceasta adresa de email")
    }
  }

  const clickProf = (evt) => {
    let index = profesori.findIndex(e => e.mail == email)
    if (index === -1) {
      if (email.match(validRegex)) {
        metodeProfesor.addProfesor(nume, email, parola)
        alert("Cont creat cu succes")
        window.location='/'
      } else {
        alert("Email invalid");
      }
    } else {
      alert("Exista deja un cont pentru aceasta adresa de email")
    }
  }

  return (
    <div>
      <input type='text' className="signupText" value='Sign up' disabled/>
      <div>
        <input type="text" className="signupForm" placeholder="name" value={nume} onChange={e => setNume(e.currentTarget.value)} />
        <input type="text" className="signupForm" placeholder="email" value={email} onChange={e => setEmail(e.currentTarget.value)} />
        <input type="password" className="signupForm" placeholder="password" value={parola} onChange={e => setParola(e.target.value)} />
      </div>
      <div>
        <input type='button' className="btnSignUp" value="Sign up as Student" onClick={clickStud} />
        <input type='button' className="btnSignUp" value="Sign up as Profesor" onClick={clickProf} />
      </div>
    </div>
  );
}

export default SignUpForm;