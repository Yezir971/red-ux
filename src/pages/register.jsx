import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [user, setUser] = useState({
        isActive: true,
    })
    const handleChange = (event) => {
        const {name, value} = event.target
        setUser((user) => ({ ...user, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await fetch(
                'http://localhost:8000/api/user/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                }
            )
        } catch (error) {
            console.error('Error', e.message)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    placeholder="prenom"
                    name="prenom"
                />
                <input
                    type="text"
                    onChange={handleChange}
                    placeholder="URL picture"
                    name="avatar"
                />
                <input
                    type="text"
                    onChange={handleChange}
                    placeholder="email"
                    name="email"
                />
                <input
                    type="password"
                    onChange={handleChange}
                    placeholder="password"
                    name="password"
                />
                <button>Registration</button>
            </form>
            <Link to="/sign">Already registered ?</Link>
        </>
    )
}

export default Register
