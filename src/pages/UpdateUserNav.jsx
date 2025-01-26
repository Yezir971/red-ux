import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const UpdateUserNav = () => {
    const storeUser = useSelector((state) => state.user)
    const navigate = useNavigate()
    const { id } = useParams()
    // on récupère la fonction updateUser depuis l'api contexte 
    const {updateUser} = useContext(AuthContext)
    const [user, setUser] = useState({
        prenom: storeUser.data.prenom,
        email: storeUser.data.email,
        avatar:storeUser.data.avatar
    })
    // si l'urtilisateur n'est pas connecter, ou qu'il essaie d'aller sur la page edit d'un autre user on le redirige vers la page d'accueil au chargement de la page
    useEffect(() => {
        if (!storeUser.log || storeUser.data._id != id) {
            navigate('/')
        }
    }, [navigate])

    const handleChange = (e) => {
        // Destructure le nom et la valeur du champ modifié
        const { name, value } = e.target
        // Met à jour le state pour les champs non-image
        setUser((prev) => ({
            ...prev, // Garde toutes les propriétés précédentes
            [name]: value, // Met à jour uniquement le champ modifié
        }))
    }

    const sendNewData = (e) => {
        e.preventDefault()
        updateUser(storeUser.data._id, user)

        console.log(user)
    }
    return (
        <>
            <h1 className='text-center'>Edit</h1>
            <div className="my-24 h-full mx-auto ">
                <form
                    className="bg-slate-300 rounded-2xl p-8 max-w-md mx-auto"
                    onSubmit={sendNewData}
                >
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            onChange={handleChange}
                            placeholder=" "
                            name="prenom"
                            value={user.prenom}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            required
                        />
                        <label
                            htmlFor="floating_prenom"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Prenom
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            value={user.email}
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            onChange={handleChange}
                            value={user.avatar}
                            placeholder=" "
                            name="avatar"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            URL image
                        </label>
                    </div>

                    {/* <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            // onChange={handleChange}
                            placeholder=" "
                            name="password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            required
                        />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Mot de passe
                        </label>
                    </div> */}
                    {/* <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            // onChange={handleChange}
                            placeholder=" "
                            name="confirm-password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            required
                        />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Confirm mot de passe
                        </label>
                    </div> */}
                    <button
                        type="submit"
                        className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        edit
                    </button>

                </form>
            </div>
        </>
    )
}

export default UpdateUserNav
