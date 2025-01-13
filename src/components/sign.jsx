import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Signup = () => {
    const [user, setUser] = useState({})
    const { login } = useContext(AuthContext)
    const handleChange = (event) => {
        const { name, value } = event.target
        setUser((prevUser) => ({ ...prevUser, [name]: value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        login(user)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email :</label>
                <input
                    type="email"
                    placeholder="email"
                    id="email"
                    name='email'
                    onChange={handleChange}
                />
                <label htmlFor="password">password :</label>
                <input
                    type="password"
                    placeholder="password"
                    name='password'
                    id="password"
                    onChange={handleChange}
                />
                <button>Login</button>
            </form>
            <Link to='/register'>You are not register ?</Link>
        </>
    )
}
export default Signup
