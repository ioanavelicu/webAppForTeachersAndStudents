import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import metodeStudent from "./compStudent/MetodeStudent";
import metodeProfesor from "./compProfesor/MetodeProfesor";

import './Home.css'

function Home() {

  const navigate = useNavigate();
  const [studenti, setStudenti] = useState([]);
  const [profesori, setProfesori] = useState([]);
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");

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
    let student = studenti.filter(e => e.mail == email)[0];
    if(student){
      if (parola != student.parola) {
        alert("Email-ul și parola nu se potrivesc");
      } else {
        navigate(`/student/${student.idStudent}`);
      }
    } else{
      alert("Nu există un cont de student la această adresa de e-mail")
    }
    
  }

  const clickProf = (evt) => {
    let profesor = profesori.filter(e => e.mail == email)[0];
    if(profesor){
      if (parola != profesor.parola) {
        alert("Email-ul și parola nu se potrivesc");
      } else {
        navigate(`/profesor/${profesor.idProfesor}`);
      }
    } else{
      alert("Nu exista un cont de profesor la această adresă de e-mail")
    }
    
  }

  return (
    <div>
      <div>
        <input type='text' className="feedback-app" value='Feedback-app' disabled/>
      </div>
      <div className="divLoginForm">
        <input type="text" className="loginForm" placeholder="email" value={email} onChange={e => setEmail(e.currentTarget.value)} />
        <input type="password" className="loginForm" placeholder="password" value={parola} onChange={e => setParola(e.target.value)} />
      </div>
      <div className="signUpLink">
        <Link to="/signUp">Don't have an account? Sign up</Link>
      </div>
      <input type='button' className="btnLogin" value="Log in as Student" onClick={clickStud} />
      <input type='button' className="btnLogin" value="Log in as Profesor" onClick={clickProf} />
    </div>
  );
}

export default Home;