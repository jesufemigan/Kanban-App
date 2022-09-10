import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppSelector } from './app/hooks';
import Main from './pages/Main';
import Signin from './pages/SignIn';
import SignUp from './pages/SignUp';


function App() {
  const { theme } = useAppSelector(state => state.theme)
  return (
    <div className={`App ${theme}`}>
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
