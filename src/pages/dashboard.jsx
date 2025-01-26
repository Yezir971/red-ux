import { useEffect, useState } from 'react'
import Add from '../components/Add'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as ACTIONS from '../redux/reducers/article.reducer'
import ListUser from '../components/ListeUser'

const Dashboard = () => {
    const [auth, setAuth] = useState(false)
    // let token = Cookies.get('access_token', { domain: 'localhost' })
    const [articles, setArticles] = useState([])
    const [error, setError] = useState(null)
    const [loading, isLoading] = useState(false)
    const disaptch = useDispatch()
    const store = useSelector((state) => state.article.data)
    // récupère les infos de l'user qui vient juste de se log
    const storeUser = useSelector((state) => state.user)

    const navigate = useNavigate()

    // si l'urtilisateur n'est pas connecter on le redirige vers la page d'accueil
    if (!storeUser.log || storeUser.data.role !== 'admin') {
        navigate('/')
    }
    const fetchArticle = async () => {
        disaptch(ACTIONS.FETCH_ARTICLE_START())
        try {
            const response = await fetch(
                'http://localhost:8000/api/article/all'
            )
            const data = await response.json()
            disaptch(ACTIONS.FETCH_ARTICLE_SUCCESS(data))
            setArticles(data)
            isLoading(true)
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchArticle()
    }, [store])

    if (error) {
        return (
            <>
                <p>{error}</p>
            </>
        )
    }

    return (
        <>
            <h1>Dashboard</h1>
            {/* <Sidebar /> */}
            {/* Main content */}
            <div className="p-4">
                <div className="p-4 border-2  rounded-lg ">
                    <h2 className="text-center my-4">Articles</h2>
                    <div className="grid grid-cols-3 gap-4 mb-4 overflow-hidden overflow-y-auto max-h-96 scroll  bg-gray-50 dark:bg-gray-200">
                        {articles &&
                            articles.map((items) => (
                                <div key={items._id}>
                                    <h2>{items.name}</h2>
                                    <Link
                                        to={{
                                            pathname: `/detail-article/${items._id}`,
                                        }}
                                    >
                                        {/* on regarde si notre lien des images commence par /uploads/ et on adapte l'url  */}
                                        <img
                                            src={
                                                items.picture.img.indexOf(
                                                    '/uploads/'
                                                ) !== -1
                                                    ? `http://localhost:8000${items.picture.img}`
                                                    : items.picture.img
                                            }
                                            width={50}
                                        />
                                    </Link>
                                    <p>{items.price}</p>
                                </div>
                            ))}
                    </div>
                    <div className="flex items-center justify-center h-full mb-4 rounded-sm bg-gray-50 dark:bg-gray-200">
                        <Add />
                    </div>
                    <div className="flex flex-col gap-5 items-center justify-center py-10 mb-4 rounded-sm bg-gray-50 dark:bg-gray-200">
                        <h2 className="text-center my-4">User</h2>
                        <ListUser />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
