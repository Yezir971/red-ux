import logo from '../assets/img/logo.webp'
import SearchBar from './SearchBar'
const NavBar = () => {
    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-slate-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a
                        href="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
                        <img src={logo} className="h-8" alt="Logo Red ux" />

                        {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Red ux</span> */}
                    </a>
                    <div className="flex ">
                        <div className="relative hidden md:block">
                            {/*composant input de type search  */}
                            <SearchBar />
                            {/*composant input de type search  */}
                        </div>

                        <button
                            data-collapse-toggle="navbar-search"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-search"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                        id="navbar-search"
                    >
                        <ul className="flex p-4 md:p-0 font-medium ">
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
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 px-3"
                                >
                                    Panier
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
