import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as ACTIONS from '../redux/reducers/article.reducer'
import { Link } from 'react-router-dom'
import banniere from "../assets/img/banniere-redux.png"
const Home = () => {
    const [articles, setArticles] = useState([])
    const [error, setError] = useState(null)
    const [loading, isLoading] = useState(false)
    const disaptch = useDispatch()
    const store = useSelector((state) => state.article.data)


    useEffect(() => {
        const fetchArticle = async () => {
            disaptch(ACTIONS.FETCH_ARTICLE_START())
            try {
                const response = await fetch(
                    'http://localhost:8000/api/article/all'
                )
                const data = await response.json()
                disaptch(ACTIONS.FETCH_ARTICLE_SUCCESS(data))
                setArticles(data)
                isLoading(true)
            } catch (error) {
                setError(error.message)
            }
        }
        fetchArticle()
    }, [])
    if (error)
        return (
            <>
                <p>{error}</p>
            </>
        )

    return (
        <>
            {/* <h1>Bienvenue su la page d'accueil</h1> */}
            {/* Bannière principale */}
            <section className="relative">
                <img
                    src={banniere}
                    alt="Carte graphique"
                    className="w-full h-[450px] object-cover"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="text-center text-white p-6">
                        <h2 className="text-4xl font-bold">
                            Boostez vos performances de jeu et de création
                        </h2>
                        <p className="mt-4 text-xl">
                            Découvrez nos cartes graphiques haut de gamme pour
                            gaming, création et professionnels.
                        </p>
                    </div>
                </div>
            </section>

            {/* Nos catégories */}
            <section id="categories" className="py-16 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold mb-12">Nos catégories</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold">Gaming</h3>
                        <p className="mt-4">
                            Cartes graphiques pour des expériences de jeu
                            ultra-réalistes et fluides.
                        </p>
                        <Link
                            to={"/article/gaming"}
                            className="mt-6 inline-block bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-400"
                        >
                            Voir les cartes gaming
                        </Link>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold">
                            Création & Productivité
                        </h3>
                        <p className="mt-4">
                            Optimisées pour les logiciels de création les plus
                            exigeants.
                        </p>
                        <Link
                            to={"/article/creation"}
                            className="mt-6 inline-block bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-400"
                        >
                            Voir les cartes créateurs
                        </Link>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold">
                            Station de travail & Pro
                        </h3>
                        <p className="mt-4">
                            Cartes graphiques pour professionnels, avec des
                            performances inégalées pour les stations de travail.
                        </p>
                        <Link
                            to={"/article/travail"}
                            className="mt-6 inline-block bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-400"
                        >
                            Voir les cartes pro
                        </Link>
                    </div>
                </div>
            </section>

            {/* Offres spéciales */}
            <section id="offers" className="py-16 bg-white text-center">
                <h2 className="text-3xl font-bold mb-12">Offres spéciales</h2>
                <div className="space-y-8">
                    <div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold">
                            Carte graphique XYZ
                        </h3>
                        <p>-10% sur votre achat ce mois-ci !</p>
                        <a
                            href="#gaming"
                            className="mt-6 inline-block bg-white text-blue-500 py-2 px-6 rounded-full hover:bg-gray-100"
                        >
                            Profiter de l'offre
                        </a>
                    </div>
                    <div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold">
                            Nouvelle Carte graphique ABC 3080
                        </h3>
                        <p>
                            Découvrez la dernière génération de cartes
                            graphiques pour des performances extrêmes.
                        </p>
                        <a
                            href="#gaming"
                            className="mt-6 inline-block bg-white text-blue-500 py-2 px-6 rounded-full hover:bg-gray-100"
                        >
                            Découvrir la nouveauté
                        </a>
                    </div>
                </div>
            </section>

            {/* Témoignages clients */}
            <section
                id="testimonials"
                className="py-16 bg-gray-100 text-center"
            >
                <h2 className="text-3xl font-bold mb-12">
                    Ce que disent nos clients
                </h2>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p>
                            "Je suis super content de ma nouvelle carte
                            graphique, elle gère tout ! Livraison rapide et
                            super service client." - Alex térieur.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p>
                            "Site fiable et simple à utiliser. J'ai trouvé la
                            carte graphique idéale pour mon setup." - Alain Térieur.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p>
                            "Juste incroyable ma nouvellle carte graphique elle tue ! " - Naymar Jean.
                        </p>
                    </div>
                </div>
            </section>

            {/* À propos */}
            <section id="about" className="py-16 bg-white text-center">
                <h2 className="text-3xl font-bold mb-6">À propos de nous</h2>
                <p>
                    Red-Ux est votre boutique en ligne dédiée à la vente
                    de cartes graphiques haut de gamme. Que vous soyez un joueur
                    passionné, un créateur de contenu ou un professionnel, nous
                    avons la carte qu'il vous faut.
                </p>
            </section>
            {/* {

                store && store.map((items) => 

                    <div key={items._id}>
                        <h2>{items.name}</h2>
                        <Link to={{pathname:`/detail/${items._id}`}}>
                            <img src={items.picture.img} width={200} />
                        
                        </Link>
                        <p>{items.price}</p>
                    </div>
                )
                
            } */}
        </>
    )
}

export default Home
