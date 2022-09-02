import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main';
import Signin from './pages/SignIn';
import SignUp from './pages/SignUp';


function App() {
  return (
    <div className='App light'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/login' element={<Signin />}/>
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
