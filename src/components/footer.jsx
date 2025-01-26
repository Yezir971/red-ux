const Footer = () => {
    return (
        <>
            <footer className="bg-blue-900 text-white p-6 text-center">
                <ul className="flex justify-center space-x-6 mb-4">
                    <li>
                        <a href="#about" className="hover:text-gray-300">
                            À propos
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-gray-300">
                            Contact
                        </a>
                    </li>
                    <li>
                        <a href="#faq" className="hover:text-gray-300">
                            FAQ
                        </a>
                    </li>
                    <li>
                        <a href="#terms" className="hover:text-gray-300">
                            Conditions générales
                        </a>
                    </li>
                </ul>
                <div className="flex justify-center space-x-4">
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        className="hover:text-gray-300"
                    >
                        Instagram
                    </a>
                    <a
                        href="https://www.twitter.com"
                        target="_blank"
                        className="hover:text-gray-300"
                    >
                        Twitter
                    </a>
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        className="hover:text-gray-300"
                    >
                        Facebook
                    </a>
                    <a
                        href="https://www.youtube.com"
                        target="_blank"
                        className="hover:text-gray-300"
                    >
                        YouTube
                    </a>
                </div>
            </footer>
        </>
    )
}

export default Footer
