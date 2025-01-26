import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Verify = () => {
    const { token } = useParams()
    const [loader, setLoader] = useState(true)
    const [message, setMessage] = useState('')
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/user/verify/${token}`, {
                    method: 'PUT'
                    

                })
                let data = response.json()
                setMessage('inscription réussie !')
                setLoader(false)
            } catch (error) {
                setLoader(false)
                setMessage('inscription faill !')
            }
        }
        fetchToken()
    }, [token])

    return (
        <>
            {!loader && (
                <>
                    <p>{message}</p>
                </>
            )}
        </>
    )
}

export default Verify
