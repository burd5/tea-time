import React from 'react'
import './nav.css'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import { useUserStore } from './useStore'

export default function Head() {

  const navigate = useNavigate()
  const setUser = useUserStore(state => state.setUser)
  const user = useUserStore((state) => state.user)

  const logout = async (req, res) => {
    await axios.get(`http://localhost:4000/logout`).then(res => {
      if(res.data === "Logged out"){
        setUser('Tea Time')
        navigate('/login')
    }})
  }

  return (
    <div>
        <nav className="nav m-10">
            <ul className="flex justify-around">
                <Link to={'/'}>
                <div className="flex">
                <i className='mug fas fa-mug-hot mr-5'></i><li className="logo">{ user === '' ? 'Tea Time' : user}</li>
                </div>
                </Link>
              
                <div className="navItems flex gap-20 items-center">
                    <Link to={'/'}>
                    <li className="">Home</li>
                    </Link>
                    <Link to={'/profile'}>
                    <li>Profile</li>
                    </Link>
                    <Link to={'/findtea'}>
                    <li>Teas</li>
                    </Link>
                    { user === '' || user === 'Tea Time' ? <Link to={'/login'}><li className="inOut">Sign In</li></Link > : <li onClick={logout} className="inOut">Sign Out</li>}
                </div>
            </ul>
        </nav>
    </div>
  )
}
