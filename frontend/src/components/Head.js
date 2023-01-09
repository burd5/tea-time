import React, { useEffect } from 'react'
import './nav.css'
import { NavLink, Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import { useUserStore } from './useStore'
import MobileMenu from './MobileMenu'

export default function Head() {

  const navigate = useNavigate()
  const setUser = useUserStore(state => state.setUser)
  const user = useUserStore((state) => state.user)


  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, [setUser]);

  const logout = async (req, res) => {
    await axios.get(`https://teatime.cyclic.app/logout`).then(res => {
      if(res.data === "Logged out"){
        localStorage.clear()
        setUser('')
        navigate('/')
    }})
  }

  return (
    <div>
        <nav className="nav">
            <ul className="navMobile flex justify-between items-center">
                <Link to={'/'}>
                <div className="flex items-center">
                <img src="https://static-00.iconduck.com/assets.00/warm-tea-icon-256x256-ubx0ccp7.png" className='mug1 fas fa-mug-hot mr-5' alt="logo"></img><li className="logo inline-block">{ user === '' ? 'Tea Time' : user}</li>
                </div>
                </Link>
                <MobileMenu />
              
                <div className="navItems flex gap-20 items-center">
                    {user === '' ? '' : <NavLink to={'/profile'} className={({ isActive }) => isActive ? "activeStyle" : "notActive"}>
                    <li>Profile</li>
                    </NavLink>}
                    <NavLink to={'/collection'} className={({ isActive }) => isActive ? "activeStyle" : "notActive"}>
                    <li>Collection</li>
                    </NavLink>
                    <NavLink to={'/teagenerator'} className={({ isActive }) => isActive ? "activeStyle" : "notActive"}>
                    <li>Tea Generator</li>
                    </NavLink>
                    { user === '' ? <NavLink to={'/login'}><li className="inOut">Sign In</li></NavLink > : <li onClick={logout} className="inOut">Sign Out</li>}
                </div>
            </ul>
        </nav>
    </div>
  )
}
