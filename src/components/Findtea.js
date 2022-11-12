import React from 'react'
import './findtea.css'
import {Link} from "react-router-dom"

function Findtea() {
  return (
    <div className="findTea">
        <h1>Teas</h1>
        <div className="flex justify-center gap-20">
            
            <div className="collection w-1/2 bg-white">
            <Link to={'/collection'}>
                <h3>Search the Collection</h3>
                <img className="findTeaImg" src="https://media.istockphoto.com/vectors/cup-of-tea-with-sugar-cubes-and-spoon-vector-id910790270?k=20&m=910790270&s=612x612&w=0&h=um-RF1IB7-p-QgyLzL3PtuRo4rWGFewq5bZCS_ulIQs=" alt="" />
            </Link>
            </div>
            
            <div className="generator w-1/2 bg-white">
            <Link to={'/teagenerator'}>
                <h3>Tea Generator</h3>
                <img className="findTeaImg" src="https://i.etsystatic.com/7434544/r/il/50f372/1637920754/il_570xN.1637920754_4zhg.jpg" alt="" />
            </Link>
            </div>
            
        </div>
    </div>
  )
}

export default Findtea
