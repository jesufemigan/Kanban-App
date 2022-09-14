import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from './app/hooks';
import Main from './pages/Main';
import Signin from './pages/SignIn';
import SignUp from './pages/SignUp';
import LoadingBar from 'react-top-loading-bar';
import { resetProgress } from './features/progressBarReducer';


function App() {
  const { theme } = useAppSelector(state => state.theme)
  const { progress } = useAppSelector(state => state.progress)
  const dispatch = useAppDispatch()
  return (
    <div className={`App ${theme}`}>
      <LoadingBar 
        color='#635FC7'
        progress={progress}
        height={4}
        loaderSpeed={700}
        onLoaderFinished={() => dispatch(resetProgress())}
      />
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
