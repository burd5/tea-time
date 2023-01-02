import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"
import { useUserStore } from './useStore'


function Login() {

    const navigate = useNavigate();
    const url = 'https://localhost:4000/login';
    const [username, setLoginUsername] = useState('')
    const [password, setLoginPassword] = useState('')
    const [errors, setError] = useState('')
    const setUser = useUserStore(state => state.setUser)
    const setUserID = useUserStore(state => state.setUserID)
  
    const login = async (req, res) => {
      await axios.post(url, {
          username: username,
          password: password,
      })
    .then(response => {
        if(response.data === 'Error'){
            setError('Username or Password is Incorrect')
        }
        else if(response.data) {
            setUser(response.data.username)
            setUserID(response.data._id)
            localStorage.setItem('user', response.data.username)
            localStorage.setItem('userID', response.data._id)
            navigate('/profile')
        } else {
            setError(response.data);
        }
    })}



  return (
    <div className="login">
        <h1 className="loginHeader">Login</h1>
        <div className="loginContainer bg-white">
            <form className="rounded px-8 pt-6 pb-8 mb-4" action="" method="">
            <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input onChange={e => setLoginUsername(e.target.value)}className="loginInputs rounded w-full py-2 px-3 text-black-700 mb-3 leading-tight focus:outline-black" id="username" type="text" placeholder="Username" />
            </div>
            <div className="mb-6">
                <label className="block text-lg font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input onChange={e => setLoginPassword(e.target.value)}className="loginInputs rounded w-full py-2 px-3 text-black-700 mb-3 leading-tight focus:outline-black" id="password" type="password" placeholder="Password" />
            </div>
            <div className="loginErrors">{errors}</div>
            <div className="flex-col items-center">
                <button onClick={login} className="loginButton" type="button">
                    Sign In
                </button>
                <Link to={'/'}>
                <span className="homeSpan inline-block font-bold text-xl text-blue-500 hover:text-blue-800">
                    Home
                </span>
                </Link>
            </div>
        </form>
        </div>
    </div> 
  )
}



export default Login
