import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as ACTIONS from '../redux/reducers/article.reducer'

import { useNavigate } from 'react-router-dom'

const Add = () => {
    const imgInput = ['img', 'img1', 'img2', 'img3', 'img4']
    const navigate = useNavigate()
    const disaptch = useDispatch()
    const store = useSelector((state) => state.article.data)
    const [article, setArticle] = useState({
        name: '',
        content: '',
        category: '',
        brand: '',
        price: 0,
        img: [],
        status: true,
        stock: 0,
    })
    const handleChange = (e) => {
        const { name, value, files } = e.target

        if (name.startsWith('img')) {
            setArticle((prev) => ({
                ...prev,
                img: files ? [...prev.img, files[0]] : prev.img,
            }))
        } else {
            setArticle((prev) => ({ ...prev, [name]: value }))
        }
    }
    const handleSubmit = async (e) => {
        // Empêche le comportement par défaut du formulaire
        e.preventDefault()
        // Création d'un objet FormData pour
        // envoyer des données multipart/form-data
        // Permet l'envoi de fichiers et de données textuelles
        const formData = new FormData()
        // Ajout des champs du formulaire dans FormData
        formData.append('name', article.name)
        formData.append('content', article.content)
        formData.append('category', article.category)
        formData.append('brand', article.brand)
        // parseInt permet de faire une conversion
        // des valeurs numériques en entiers
        formData.append('price', parseInt(article.price))
        formData.append('status', article.status)
        formData.append('stock', parseInt(article.stock))
        // Parcours du tableau d'images
        // et ajout de chaque image dans FormData
        // Le nom 'img' doit correspondre
        // au champ attendu par Multer côté serveur
        article.img.forEach((image) => {
            formData.append('img', image)
        })
        disaptch(ACTIONS.FETCH_ARTICLE_START())
        try {
            // Envoi de la requête POST avec fetch
            const response = await fetch(
                'http://localhost:8000/api/article/add',
                {
                    method: 'POST',
                    body: formData,
                    
                    // Pas besoin de spécifier le Content-Type avec fetch
                    // lors de l'utilisation de FormData
                    // Il sera automatiquement défini avec la bonne valeur
                    //  incluant le boundary
                }
            )
            disaptch(ACTIONS.FETCH_ARTICLE_DETAIL())
            // navigate('/dashboard')

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }
    return (
        <>
            <form className="flex gap-14 " onSubmit={handleSubmit}>
                <div className="flex gap-4 flex-col">
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        placeholder="Nom de l'article"
                        required
                    />
                    <textarea
                        name="content"
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        onChange={handleChange}
                        placeholder="Catégorie"
                        required
                    />
                    <input
                        type="text"
                        name="brand"
                        onChange={handleChange}
                        placeholder="Marque"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        onChange={handleChange}
                        placeholder="Prix"
                        required
                    />
                </div>
                <div className="flex flex-col justify-center">
                    {imgInput.map((imgName, index) => (
                        <div key={imgName}>
                            <label>
                                {index === 0
                                    ? 'Image principale (URL):'
                                    : `Image ${index} (URL):`}
                            </label>
                            <input
                                type="file"
                                name={imgName}
                                onChange={handleChange}
                                placeholder={`Image ${imgName.slice(-1)}`}
                            />
                        </div>
                    ))}
                </div>
                <span className="">
                    <input
                        type="number"
                        name="stock"
                        onChange={handleChange}
                        placeholder="Stock"
                        required
                    />
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

                    <button  className="bg-green-600 text-white rounded-lg p-2 ">
                        
                        Ajouter l'article
                    </button>
                </span>
            </form>
        </>
    )
}

export default Add
