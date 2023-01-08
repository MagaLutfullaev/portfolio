import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.sass';
import Tiping from './components/projects/Tiping/Tiping';
import NotFound from './components/NotFound/NotFound';
import Ticube from './components/projects/Ticube/Ticube';
import Main from './components/Main/Main';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/ticube' element={<Ticube />} />
          <Route path='/tiping' element={<Tiping />} />
          <Route path='*' element={<NotFound />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
