import '../App.css';
import Home from './Home';
import StudentHome from './compStudent/StudentHome';
import StudentAddReactie from './compStudent/StudentAddReactie';
import ProfesorHome from './compProfesor/ProfesorHome';
import ListaReactii from './compRaspuns/ListaRaspunsuri';
import SignUpForm from './SignUpForm';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <Router>
        <Routes>

          <Route path='/' element={<Home />} />
          {/* din home o sa am login screen de student si profesor, voi avea si opt de sign up */}
          <Route path='/signUp' element={<SignUpForm />} />
 
          <Route path='/student/:id' element={<StudentHome />} />
          {/* din student voi putea introduce cod de activitate ca sa imi apara raspunsuri */}

          <Route path='/student/:id/:codActivitate/reactie' element={<StudentAddReactie />} />
          {/* adauga rasp la o activitate */}

          <Route path='/profesor/:id' element={<ProfesorHome />} />
          {/* ca profesor o sa am buton de creeaza activitate si o lista de activitati cu raspunsurile si ora */}

          <Route path='/:id/reactii' element={<ListaReactii />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
