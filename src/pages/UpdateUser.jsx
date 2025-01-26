import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

const UpdateUser = () => {
    const storeUser = useSelector((state) => state.user)
    const navigate = useNavigate()
    const {id} = useParams()
    // si l'urtilisateur n'est pas connecter, ou qu'il essaie d'aller sur la page edit d'un autre user on le redirige vers la page d'accueil au chargement de la page 
    useEffect(() => {
        if (!storeUser.log || storeUser.data._id != id) {
            navigate('/')
        }
    }, [navigate])

    return(
        <>
            <p>Update user f</p>
        </>
    )
}

export default UpdateUser