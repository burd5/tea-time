import React from 'react'
import './login.css'
import {Link} from "react-router-dom"


function Login() {
  return (
    <div className="login">
        <h1 className="loginHeader">Login</h1>
        <div className="loginContainer bg-white">
            <form class="rounded px-8 pt-6 pb-8 mb-4" action="">
            <div class="mb-4">
                <label class="block text-lg font-bold mb-2" for="username">
                    Username
                </label>
                <input class="loginInputs rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-black" id="username" type="text" placeholder="Username" />
            </div>
            <div class="mb-6">
                <label class="block text-lg font-bold mb-2" for="password">
                    Password
                </label>
                <input class="loginInputs rounded w-full py-2 px-3 text-black-700 mb-3 leading-tight focus:outline-black" id="password" type="password" placeholder="Password" />
            </div>
            <div class="flex-col items-center">
                <button class="loginButton" type="button">
                    Sign In
                </button>
                <Link to={'/'}>
                <span class="homeSpan inline-block font-bold text-xl text-blue-500 hover:text-blue-800">
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
