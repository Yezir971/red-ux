import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Update = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const imgInputs = ['img', 'img1', 'img2', 'img3', 'img4']
    const [article, setArticle] = useState({
        name: '',
        content: '',
        category: '',
        brand: '',
        price: 0,
        picture: [],
        status: true,
        stock: 0,
    })
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/api/article/get/${id}`
                )
                const data = await response.json()
                setArticle(data)
            } catch (error) {
                console.error(error.message)
            }
        }
        fetchArticle()
    }, [id])

    const handleChange = (e) => {
        // Destructure le nom et la valeur du champ modifié
        const { name, value } = e.target
        // Vérifie si le champ modifié est une image (commence par 'img')
        if (name.startsWith('img')) {
            // Met à jour le state pour les champs d'image
            setArticle((prev) => ({
                ...prev, // Garde toutes les propriétés précédentes
                picture: {
                    ...prev.picture, // Garde toutes les images précédentes
                    [name]: value, // Met à jour uniquement l'image modifiée
                },
            }))
        } else {
            // Met à jour le state pour les champs non-image
            setArticle((prev) => ({
                ...prev, // Garde toutes les propriétés précédentes
                [name]: value, // Met à jour uniquement le champ modifié
            }))
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Envoi de la requête POST avec fetch
            const response = await fetch(
                `http://localhost:8000/api/article/update/${id}`,
                {
                    method: 'PUT',
                    headers:{
                        "Content-Type":"application/json",
                    },
                    // permet d'inclure les token dans la requete 
                    credentials: 'include', 
                    body: JSON.stringify(article)
                }
            )
            if (response.status === 200) {
                navigate(`/detail/${id}`)
            }
        } catch (error) {
            console.error('Error lors de la mise a jour:', error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Modifier l'article</h1>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="name"
                        value={article.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Contenu:</label>
                    <textarea
                        name="content"
                        value={article.content}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Catégorie:</label>
                    <input
                        type="text"
                        name="category"
                        value={article.category}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Marque:</label>
                    <input
                        type="text"
                        name="brand"
                        value={article.brand}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Prix:</label>
                    <input
                        type="number"
                        name="price"
                        value={article.price}
                        onChange={handleChange}
                    />
                </div>
                {imgInputs.map((imgName, index) => (
                    <div key={imgName}>
                        <label>
                            {index === 0
                                ? 'Image principale (URL):'
                                : `Image ${index} (URL):`}
                        </label>
                        <input
                            type="text"
                            name={imgName}
                            value={
                                article.picture[imgName]
                                    ? article.picture[imgName]
                                    : ''
                            }
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <div>
                    <label>Status:</label>
                    <input
                        type="checkbox"
                        name="status"
                        checked={article.status}
                        onChange={(e) =>
                            setArticle((prev) => ({
                                ...prev,
                                status: e.target.checked,
                            }))
                        }
                    />
                </div>
                <div>
                    <label>Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={article.stock}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Mettre à jour</button>
            </form>
        </>
    )
}

export default Update
