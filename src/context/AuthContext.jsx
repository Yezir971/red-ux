import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [auth, setAuth] = useState(null)
    const navigate = useNavigate()
    const login = async (dataForm) =>{
        setIsLoading(true)
        try {
            const response = await fetch(`http://localhost:8000/api/user/sign`, {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataForm)
            })
            let data = await response.json()
            console.log(data)
            if(response.status === 200){
                localStorage.setItem('auth', JSON.stringify(data))
                setAuth(data)
                navigate('/')
                setIsLoading(false)
            }
        } catch (error) {
            console.error('error' , error.message);
            setIsLoading(false)
        }
    } 
    return(
        <AuthContext.Provider value={{ login, auth, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider