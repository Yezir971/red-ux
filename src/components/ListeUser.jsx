import * as ACTIONS from '../redux/reducers/users.reducer'
import { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ListUser = () => {
    // récupère le store de tout les users
    const storeUsers = useSelector((state) => state.users)
    const storeUser = useSelector((state) => state.user)
    const disaptch = useDispatch()
    const [users, setUsers] = useState([])
    const { deleteUser } = useContext(AuthContext)

    const fetchUsers = async () => {
        disaptch(ACTIONS.FETCH_USERS_START())
        try {
            const response = await fetch('http://localhost:8000/api/user/get')
            const data = await response.json()
            disaptch(ACTIONS.FETCH_USERS_SUCCESS(data))
            setUsers(data)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            await fetchUsers()
        }
        fetchData()
    }, [])

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nom
                            </th>
                            <th scope="col" className="px-6 py-3">
                                avatar
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Roles
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeUsers &&
                            storeUsers.data.map((element, idKey) => (
                                <tr
                                    key={idKey}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {element.prenom}
                                    </th>
                                    <td className="px-6 py-4">
                                        <img
                                            className="rounded-xl"
                                            width={30}
                                            src={
                                                element.avatar.indexOf(
                                                    '/uploads/'
                                                ) !== -1
                                                    ? `http://localhost:8000${element.avatar}`
                                                    : element.avatar
                                            }
                                            alt={`avatar de ${element.prenom}`}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <p
                                            className={
                                                element.role === 'admin'
                                                    ? 'text-red-700'
                                                    : 'text-green-700'
                                            }
                                        >
                                            {element.role}
                                        </p>
                                    </td>
                                    <td className="flex px-6 py-4 gap-4">
                                        {/* c'est l'histoire de albert qui supprime son propre compte :D  */}
                                        {element._id == storeUser.data._id && (
                                            <>
                                                <Link
                                                    to={`/update-user-nav/${storeUser.data._id}`}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <p
                                                    
                                                    onClick={() =>
                                                        deleteUser(element._id)
                                                    }
                                                    className="cursor-pointer font-medium text-red-800 dark:text-red-800 hover:underline"
                                                >
                                                    Delete
                                                </p>
                                            </>
                                        )}
                                        <Link
                                            to={`/dashboard-detail-user/${element._id}`}
                                            className="font-medium text-gray-500 dark:text-gray-500 hover:underline"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListUser
