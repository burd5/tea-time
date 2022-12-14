import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"
import {useUserStore} from './useStore'
function Signup() {

    const navigate = useNavigate()
    const url = `https://teatime.cyclic.app/signup`;
    const [username, setRegisterUsername] = useState('')
    const [password, setRegisterPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [formErrors, setError] = useState([])
    const setUser = useUserStore(state => state.setUser)
    const setUserID = useUserStore(state => state.setUserID)
  
    const signup = async (req, res) => {
      await axios.post(url, {
          username: username,
          password: password,
          confirmPassword: confirmPassword,
      })
    .then(response => {
        console.log(response)
        if(response.data.length > 0){
            setError(response.data)
        }
        else if(response.data) {
            setUser(response.data.username)
            setUserID(response.data._id)
            localStorage.setItem('user', response.data.username)
            localStorage.setItem('userID', response.data._id)
            navigate('/collection')
        } else {
        setError(response.data)
        console.log(response.data);
        }
    })}

  return (
    <div className="signup">
        <h1 className="signupHeader">Sign Up</h1>
        <div className="signupContainer bg-white">
            <form className="rounded px-8 pt-6 pb-8 mb-4" action="">
            <div className="mb-4">
                <label className="block text-lg font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input name="username" onChange={e => setRegisterUsername(e.currentTarget.value)} className="loginInputs rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-black" id="username" type="text" placeholder="Username" />
            </div>
            <div className="mb-6">
                <label className="block text-lg font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input onChange={e => setRegisterPassword(e.currentTarget.value)} className="loginInputs rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-black" name="pass" id="password" type="password" placeholder="Password" />
            </div>
            <div className="mb-6">
                <label className="block text-lg font-bold mb-2" htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <input onChange={e => setConfirmPassword(e.currentTarget.value)} className="loginInputs rounded w-full py-2 px-3 text-black-700 mb-3 leading-tight focus:outline-black" name="confirmPass" id="confirmPassword" type="password" placeholder="Password" />
            </div>
            <div className="loginErrors">{formErrors.map( (error,index) => <div key={error[index]}>{error}</div>)}</div>
            <div className="flex-col items-center">
                <button onClick={ signup } className="loginButton" type="button">
                    Sign Up
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

export default Signup