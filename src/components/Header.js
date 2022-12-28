import React, { useEffect } from 'react'
import './header.css'
import axios from 'axios'
import {Link} from "react-router-dom"
import {useUserStore} from './useStore'


function Header() {
    const user = useUserStore((state) => state.user)
    const setUser = useUserStore(state => state.setUser)

    useEffect(() => {
        window.scrollTo(0,0);
      }, [])

    const logout = async (req, res) => {
        await axios.get(`http://localhost:4000/logout`).then(res => {
          if(res.data === "Logged out"){
            localStorage.clear()
            setUser('')
        }})
      }

  return (
    <div className="header flex justify-center">
        <div className="header">
            <h1 className="text-center mt-10">Tea Time</h1>
            <img className="teaImg" src="https://i.pinimg.com/originals/a5/8b/bd/a58bbd693cb5981b1717c5b184c4f898.gif" alt="" />
        </div>
        <div className="headerList self-center ml-20 mt-40">
                <Link to={'/findtea'}>
                    <button>
                        Find a Tea
                    </button>
                </Link>
                { user === '' || user === 'Tea Time' || !user ? 
                <Link to={'/login'}>
                    <button>
                        Log In
                    </button>
                </Link> : 
                    <button onClick={ logout }>
                        Log Out
                    </button>
                 }
                <Link to={'/signup'}>
                    <button>
                        Sign Up
                    </button>
                </Link>
        </div>
    </div>
  )
}

export default Header
