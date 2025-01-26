import { createContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as ACTIONS from '../redux/reducers/user.reducer'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    // const log = useSelector((state) => state.user.log)
    const [auth, setAuth] = useState(false)
    const [message, setMessage] = useState("")
    const [idUser, setIdUser] = useState()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const login = async (dataForm) => {
        setIsLoading(true)
        dispatch(ACTIONS.FETCH_USER_START())
        try {
            const response = await fetch(
                `http://localhost:8000/api/user/sign`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(dataForm),
                }
            )
            let data = await response.json()
            dispatch(ACTIONS.FETCH_USER_SUCCESS(data))
            // si on a un status 200 et que le compte est activer on va vers la page accueil sinon on reste sur la page page log et on affiche un message d'erreur 
            if (response.status === 200 && data.isActive ) {
                setAuth(true)
                setIsLoading(false)
                navigate('/')
                
            }
            
            if (data.isActive === false){
                setMessage(`Votre compte n'est plus activé cliquer sur le lien suivant pour l'activer à nouveau !`)
                // on enregistre dans le state l'id de l'utilisateur 
                setIdUser(data._id)
                return
            }

            // si on a pas de message 400 c'est que l'on a un pb avec le mdp ou le mail 
            if (response.status === 400 && data.isActive ) {
                setIsLoading(false)
                setMessage("Votre mail ou mdp n'est pas correcte !")
            }

        } catch (error) {
            console.error('error', error.message)
            setIsLoading(false)
            setMessage("erreur avec le serveur : " + error)
        }
    }

    const logout = () => {
        console.log('Avant :', document.cookie)
        // Supprimez les cookies ici...
        document.cookie = `access_token=;`
        // document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:   00:00 UTC; path=/; domain=${window.location.hostname}`
        console.log('Après :', document.cookie)
        setAuth(false)
        dispatch(ACTIONS.USER_LOGOUT())
        navigate('/')
    }

    const deleteUser = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/user/delete/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // permet d'inclure les token dans la requete
                    credentials: 'include',
                }
            )
            logout()
            navigate('/')

            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(error.message)
        }
    }
    const updateUser = async (id, body) => {
        try {
            dispatch(ACTIONS.FETCH_USER_START())
            const response = await fetch(`http://localhost:8000/api/user/update/${id}`, {
                method:"PUT",
                headers:{
                    "Content-type":"application/json",
                },
                credentials:"include",
                body: JSON.stringify(body)
            })
            const data = await response.json()
            // mise à jour du store 
            dispatch(ACTIONS.FETCH_USER_SUCCESS(data.userUpdated))
            navigate('/')
            console.log(data)
            return data 
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <AuthContext.Provider value={{ logout, login, auth, isLoading, message, setMessage, idUser, deleteUser, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
