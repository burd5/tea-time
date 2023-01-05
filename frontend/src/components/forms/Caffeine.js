import React from 'react'
import './teaform.css'



function Caffeine({page, setPage, formData, setFormData}) {

    const handleSubmit = event => {
        event.preventDefault();
        console.log(formData)
    }

  return (
    <div className="teaForm">
        <form onSubmit={handleSubmit} action="">
            <h3 className="teaQuestion">Pick a caffeine level:</h3>
            <div className="teaType">
                <div>
                <input type="radio" name="type" value={formData.caffeine} onClick={(e) =>
                setFormData({ ...formData, caffeine: e.target.value })}/> High
                </div>
                <div>
                <input type="radio" name="type" value={formData.caffeine} onClick={(e) =>
                setFormData({ ...formData, caffeine: e.target.value })}/> Medium
                </div>
                <div>
                <input type="radio" name="type" value={formData.caffeine} onClick={(e) =>
                setFormData({ ...formData, caffeine: e.target.value })}/> Low 
                </div>
                <div>
                <input type="radio" name="type" value={formData.caffeine} onClick={(e) =>
                setFormData({ ...formData, caffeine: e.target.value })}/> None
                </div>  
                <div>  
                <input type="radio" name="type" value={formData.caffeine} onClick={(e) =>
                setFormData({ ...formData, caffeine: e.target.value })}/> Show me all caffeine levels
                </div>
            </div>   
            <div className="flex">
            <button onClick={() => {setPage(page - 1) }} className="teaQuizButton" type="submit">Previous</button>
            <button className="teaQuizButton" type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Caffeine