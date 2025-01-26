import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const DetailUsersNav = () => {
    const storeUser = useSelector((state) => state.user)
    const navigate = useNavigate()
    // si l'urtilisateur n'est pas connecter on le redirige vers la page d'accueil au chargement de la page
    const { id } = useParams()
    const [toggle, steToggle] = useState(false)
    const { deleteUser } = useContext(AuthContext)

    useEffect(() => {
        // si l'utilisateur n'est pas log ou qu'il esssaie de d'accéder à la page détail d'un autre user on le le redirige
        if (!storeUser.log || storeUser.data._id !== id) {
            navigate('/')
        }
        // on récupère les informations de l'utilisateur depuis le store
    }, [id])
    const toggleButton = () => {
        steToggle(!toggle)
        console.log(toggle)
    }
    return (
        <>
            <h1 className="text-center p-10">Detail user</h1>
            <div className="h-auto">
                <div className=" m-auto relative w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-end px-4 pt-4">
                        <button
                            id="dropdownButton"
                            data-dropdown-toggle="dropdown"
                            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                            type="button"
                            onClick={toggleButton}
                        >
                            <span className="sr-only">Open dropdown</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 3"
                            >
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                        </button>

                        {/* Dropdown menu  */}
                        {toggle && (
                            <div
                                id="dropdown"
                                className="z-10 absolute top-16 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
                            >
                                <ul
                                    className="py-2"
                                    aria-labelledby="dropdownButton"
                                >
                                    <li>
                                        <Link
                                            to={`/update-user-nav/${storeUser.data._id}`}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        >
                                            Edit
                                        </Link>
                                    </li>
                                    <li>
                                        <p
                                            onClick={() => deleteUser(storeUser.data._id)}
                                            className="cursor-pointer block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        >
                                            Delete
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* Dropdown menu  */}

                    <div className="flex flex-col items-center p-10">
                        {storeUser.data !== null && storeUser.data ? (
                            <>
                                <img
                                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                    src={`${storeUser.data.avatar}`}
                                    alt={`avatar de ${storeUser.data.prenom}`}
                                />
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                    {storeUser.data.prenom}
                                </h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    role : {storeUser.data.role}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    email : {storeUser.data.email}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    id : {storeUser.data._id}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    date make : {storeUser.data.createdAt}
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

export default DetailUsersNav
