import { useParams } from 'react-router-dom'
import * as ACTIONS from '../redux/reducers/article.reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const DetailArticle = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const store = useSelector((state) => state.article.data)
    const storeUser = useSelector((state) => state.user.data)
    const [article, setArticle] = useState()
    const [avis, setAvis] = useState()
    const filterArticle = () => {
        return setArticle(store.filter((element) => element._id == id))
    }
    // const fetchAvis = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:8000/api/article/avis/${id}`,{
    //             credentials:"include",
    //             body:JSON.stringify(body),
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         })
    //         const data = await response.json()
    //         return data

    //     } catch (error) {
    //         console.error(error.message)
    //     }
    // }
    useEffect(() => {
        filterArticle()
        // fetchAvis()
    }, [])
    console.log(storeUser)
    return (
        <>
            {article &&
                article.map((element, id) => (
                    <div key={id} className="container">
                        <p>page détail de l'article </p>
                        <p>Nom de l'article : {element.name}</p>
                        <p>prix de l'article : {element.price} €</p>
                        <p>description de l'article : {element.content} </p>
                        <p>stock de l'article : {element.stock} </p>

                        <img
                            src={
                                element.picture.img.indexOf('/uploads/') !== -1
                                    ? `http://localhost:8000${element.picture?.img}`
                                    : element.picture?.img
                            }
                        />
                    </div>
                ))}

            <h2 className='text-center'>Avis</h2>
            {
                storeUser.length === 0 ? (
                    <>
                        <p>vous devez etre connecter pour ajouter un comentaire</p>
                    </>
                ):(
                    <>
                        <form action="">
                            <textarea name="avis" id="" cols="30" rows="10"></textarea>
                            <input type="submit" value="envoyer" />
                        </form>
                    </>
                ) 
            }

        </>
    )
}

export default DetailArticle
