import { useSelector } from 'react-redux'
import logo from '../assets/img/logo.png'
import { AuthContext } from '../context/AuthContext'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const { logout, auth } = useContext(AuthContext)
    const storeUser = useSelector((state) => state.user)
    console.log(storeUser.data._id)

    // fonction pour déconnecter l'utilisateur
    const out = () => {
        logout()
    }
    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-slate-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link
                        to={'/'}
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
                        <img src={logo} className="h-14" alt="Logo Red ux" />

                        {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Red ux</span> */}
                    </Link>

                    <div
                        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                        id="navbar-search"
                    >
                        <ul className="flex items-center gap-12 p-4 md:p-0 font-medium ">
                            {auth ? (
                                storeUser.data.role == 'admin' ? (
                                    <>
                                        <Link to={'/dashboard'}>Dasboard</Link>
                                        <p
                                            onClick={out}
                                            className="cursor-pointer"
                                        >
                                            Logout
                                        </p>
                                        <Link to={`/detail-user-nav/${storeUser.data._id}`}>
                                            <img
                                                className="rounded-full border-red-400 cursor-pointer"
                                                width={50}
                                                src={storeUser.data.avatar}
                                                alt="avatar utilisateur"
                                            />
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <p
                                            onClick={out}
                                            className="cursor-pointer"
                                        >
                                            Logout
                                        </p>
                                        <Link to={`/detail-user-nav/${storeUser.data._id}`}>
                                            <img
                                                className="rounded-full border-red-400 cursor-pointer"
                                                width={50}
                                                src={storeUser.data.avatar}
                                                alt="avatar utilisateur"
                                            />
                                        </Link>
                                    </>
                                )
                            ) : (
                                <>
                                    <li>
                                        <a
                                            href="/signup"
                                            className="block py-2 px-3"
                                            aria-current="page"
                                        >
                                            Se connecter
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/register"
                                            className="block py-2 px-3"
                                        >
                                            S'inscrire
                                        </a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
