import { Routes, Route } from 'react-router-dom'
import Mathilde from './components/Mathilde'
import James from './components/James'
import Home from './pages/home'
import NavBar from './components/NavBar'
import Detail from './pages/details'
import AddArticle from './pages/addArticle'
import Update from './pages/update'
import Register from './pages/register'
import Signup from './pages/sign'
import Verify from './pages/verify'
import Dashboard from './pages/dashboard'
import Footer from './components/footer'
import DetailsUser from './pages/DetailsUser'
import UpdateUser from './pages/UpdateUser'
import DetailUsersNav from './pages/DetailsUserNav'
import UpdateUserNav from './pages/UpdateUserNav'
import Article from './pages/Article'
import DetailArticle from './pages/DetailArticle'
function App() {
    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/mathilde" element={<Mathilde />} />
                <Route path="/james" element={<James />} />
                <Route path="/article/add" element={<AddArticle />} />
                <Route path="/detail-article/:id" element={<Detail />} />
                <Route path="/update/:id" element={<Update />} />
                <Route path="/register" element={<Register />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify/:token" element={<Verify />} />
                <Route path="/detail-user-nav/:id" element={<DetailUsersNav />} />
                <Route path="/update-user-nav/:id" element={<UpdateUserNav />} />
                <Route path='/article/:type' element={<Article />} />
                <Route path='/DetailArticle/:id' element={<DetailArticle />} />
                {/* dashboard   */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard-detail-user/:id" element={<DetailsUser />} />
                <Route path="/dashboard-update-user/:id" element={<UpdateUser />} />
                {/* dashboard   */}

                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
