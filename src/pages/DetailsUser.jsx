import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import * as ACTIONS from '../redux/reducers/users.reducer'

const DetailsUser = () => {
    const storeUser = useSelector((state) => state.user)
    const navigate = useNavigate()
    // si l'urtilisateur n'est pas connecter on le redirige vers la page d'accueil au chargement de la page
    const dispatch = useDispatch()
    // on récupère les données depuis le store
    const storeUsers = useSelector((state) => state.users.currentUser)
    const { id } = useParams()

    useEffect(() => {
        dispatch(ACTIONS.FETCH_USERS_START())
        // si l'utilisateur n'est pas log ou qu'il esssaie de d'accéder à la page détail d'un autre user on le le redirige
        // if (!storeUser.log || storeUser.data.role !== 'admin') {
        if (
            !storeUser.log ||
            storeUser.data.role !== 'admin'
        ) {
            navigate('/')
        }
        // on récupère les informations de l'utilisateur depuis le store

        dispatch(ACTIONS.FETCH_USER_DETAIL(id))
    }, [id])

    // si on a pas encore les données du store dans notre localStorage on affiche le message LOading
    console.log(storeUser)
    return (
        <>
            <h1 className="text-center p-10">Detail user</h1>
            <div className="h-auto">
                <div className=" m-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center p-10">
                        {storeUsers !== null && storeUsers ? (
                            <>
                                <img
                                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                    src={`${storeUsers[0].avatar}`}
                                    alt={`avatar de ${storeUsers[0].prenom}`}
                                />
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                    {storeUsers[0].prenom}
                                </h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    role : {storeUsers[0].role}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    email : {storeUsers[0].email}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    id : {storeUsers[0]._id}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    date make : {storeUsers[0].createdAt}
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="text-center mt-10">
                                    <p className="text-white">Loading...</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default DetailsUser
