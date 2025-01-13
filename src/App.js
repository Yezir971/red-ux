import { Routes, Route } from 'react-router-dom'
import Mathilde from './components/Mathilde'
import James from './components/James'
import Home from './pages/home'
import NavBar from './components/NavBar'
import Detail from './pages/details'
import AddArticle from './pages/addArticle'
import Update from './pages/update'
import Register from './pages/register'
import Signup from './components/sign'
import Verify from './pages/verify'
function App() {
    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/mathilde" element={<Mathilde />} />
                <Route path="/james" element={<James />} />
                <Route path="/article/add" element={<AddArticle />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/update/:id" element={<Update />} />
                <Route path="/register" element={<Register />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify/:token" element={<Verify />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    )
}

export default App
