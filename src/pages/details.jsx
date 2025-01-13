import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import * as ACTIONS from '../redux/reducers/article.reducer'

const Detail = () => {
    const [error, setError] = useState(null)
    const [article, setArticle] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const store = useSelector(state => state.article.data)
    const dispatch = useDispatch()


    const deleteArticle = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/article/delete/${article._id}`)
            if (response.status === 200) {
                navigate('/')
            }
        } catch (error) {
            console.error("Error lors de la suppression: ", error)
        }
    }
    useEffect(() => {
        const fetchArticle = async () => {
            dispatch(ACTIONS.FETCH_ARTICLE_START())
            try {
                const response = await fetch(`http://localhost:8000/api/article/get/${id}`)
                const data = await response.json()
                setArticle(data)
                // dispatch(ACTIONS.FETCH_ARTICLE_SUCCESS(data))
            } catch (error) {
                setError(error.message)
                console.error(error)
            }
        }
        fetchArticle()
    }, [id])
    console.log(loading)
    return (
        <>

            <h1>Détails de l'article</h1>
            <h2>{article.name}</h2>
            <img src={article.picture?.img} alt={article.name} width={200} />
            <p>{article.price}€</p>
            <p>{article.description}</p>
            <button onClick={deleteArticle}>Supprimer l'article</button>
            <div>
            <Link to={{pathname: `/update/${article._id}`}} >Update</Link>

            </div>

        </>
    )
}

export default Detail
