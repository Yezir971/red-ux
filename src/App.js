
import { Routes, Route} from 'react-router-dom'
import Mathilde from './components/Mathilde';
import James from './components/James';
import Home from './pages/home';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/mathilde' element={<Mathilde />} />
        <Route path='/james' element={<James />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
