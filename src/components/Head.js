import React from 'react'
import './nav.css'
import {Link} from "react-router-dom"

export default function Head() {
  return (
    <div>
        <nav className="nav m-10">
            <ul className="flex justify-around">
                <Link to={'/'}>
                <li className="logo"><i className='fas fa-mug-hot mr-5'></i>Tea Time</li>
                </Link>
                <div className="flex gap-20 text-3xl items-center">
                    <Link to={'/'}>
                    <li className="">Home</li>
                    </Link>
                    <Link to={'/profile'}>
                    <li>Profile</li>
                    </Link>
                    <Link to={'/findtea'}>
                    <li>Teas</li>
                    </Link>
                    <li className="">Sign Out</li>
                </div>
            </ul>
        </nav>
    </div>
  )
}
