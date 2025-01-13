import { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import * as ACTIONS from '../redux/reducers/article.reducer'
import { Link } from "react-router-dom"
const Home = () => {
    const [articles, setArticles] = useState([])
    const [error, setError] = useState(null)
    const [loading, isLoading] = useState(false)
    const disaptch = useDispatch()
    const store = useSelector(state => state.article.data)

    useEffect(() => {
        const fetchArticle = async () =>{
            disaptch(ACTIONS.FETCH_ARTICLE_START())
            try {
                const response = await fetch('http://localhost:8000/api/article/all')
                const data = await response.json()
                disaptch(ACTIONS.FETCH_ARTICLE_SUCCESS(data))
                setArticles(data) 
                isLoading(true)
            } catch (error) {
                setError(error.message)
            }
        } 
        fetchArticle()
    }, [])
    if(error) return <><p>{error}</p></>
    // console.log("store: ");
    
    // console.log(loading)
    return(
        <>
            <h1>Bienvenue su la page d'accueil</h1>
            {

                store && store.map((items) => 

                    <div key={items._id}>
                        <h2>{items.name}</h2>
                        <Link to={{pathname:`/detail/${items._id}`}}>
                            <img src={items.picture.img} width={200} />
                        
                        </Link>
                        <p>{items.price}</p>
                    </div>
                )
                
            }
        </>
    )
}

export default Home