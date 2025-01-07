import { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import * as ACTIONS from '../redux/reducers/article.reducer'
const Home = () => {
    const [articles, setArticles] = useState([])
    const [error, setError] = useState(null)
    const [loading, isLoading] = useState(false)
    const disaptch = useDispatch()
    // const store = useSelector(state => state.articles.data)
    useEffect(() => {
        const fetchArticle = async () =>{
            disaptch(ACTIONS.FETCH_ARTICLE_START())
            try {
                const response = await fetch('http://localhost:8000/api/article/all')
                const data = await response.json()
                disaptch(ACTIONS.FETCH_ARTICLE_SUCCESS(data))



                // console.log(store)
                setArticles(data) 
                isLoading(true)
            } catch (error) {
                setError(error.message)
            }
        } 
        isLoading(false)
        fetchArticle()
    }, [])
    if(error) return <><p>{error}</p></>
    return(
        <>
            <h1>Bienvenue sur ma page d'accueil</h1>
            {
                isLoading && (
        
                    articles.map((items) => {

                        <div key={items._id}>
                            <p>{items.name}</p>
                            <img src={items.picture.img} width={200} />
                            <p>{items.price}</p>
                        </div>

                    })
                )
            }
        </>
    )
}

export default Home