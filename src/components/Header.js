import React from 'react'
import './header.css'
import {Link} from "react-router-dom"

function Header() {
  return (
    <div className="flex justify-center">
        <div className="mainLeft">
            <h1 className="header text-center mt-10">Tea Time</h1>
            <img className="teaImg" src="https://i.pinimg.com/originals/a5/8b/bd/a58bbd693cb5981b1717c5b184c4f898.gif" alt="" />
        </div>
        <div className="mainRight self-center ml-20 mt-40">
                <Link to={'/findtea'}>
                    <button>
                        Find a Tea
                    </button>
                </Link>
                <Link to={'/login'}>
                    <button>
                        Log In
                    </button>
                </Link>
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
