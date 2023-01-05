import React from 'react'
import './teaform.css'

function TeaFlavor({page, setPage, formData, setFormData}) {
  return (
    <div className="teaForm">
        <form action="">
            <h3 className="teaQuestion">What flavors are you looking for?</h3>
            <div className="teaType">
                <div>
                <input type="checkbox" name="flavor" value={formData.flavor} onClick={(e) =>
                setFormData({ ...formData, flavor: e.target.value })}/> Vegetal 
                </div>
                <div>
                <input type="checkbox" name="flavor" value={formData.flavor} onClick={(e) =>
                setFormData({ ...formData, flavor: e.target.value })}/> Savory
                </div>
                <div>
                <input type="checkbox" name="flavor" value={formData.flavor} onClick={(e) =>
                setFormData({ ...formData, flavor: e.target.value })}/> Nutty/Toasty 
                </div>
                <div>
                <input type="checkbox" name="flavor" value={formData.flavor} onClick={(e) =>
                setFormData({ ...formData, flavor: e.target.value })}/> Floral
                </div>  
                <div>  
                <input type="checkbox" name="flavor" value={formData.flavor} onClick={(e) =>
                setFormData({ ...formData, flavor: e.target.value })}/> Earthy
                </div>
                <div>    
                <input type="checkbox" name="flavor" value={formData.flavor} onClick={(e) =>
                setFormData({ ...formData, flavor: e.target.value })}/> Fruity 
                </div> 
                <div>  
                <input type="checkbox" name="flavor" value={formData.flavor} onClick={(e) =>
                setFormData({ ...formData, flavor: e.target.value })}/> Sweet
                </div>
                <div>  
                <input type="checkbox" name="flavor" value={formData.flavor} onClick={(e) =>
                setFormData({ ...formData, flavor: e.target.value })}/> Mineral
                </div>
                <div>  
                <input type="checkbox" name="flavor" value={formData.flavor} onClick={(e) =>
                setFormData({ ...formData, flavor: e.target.value })}/> Spicy
                </div>
            </div>   
            <div className="flex">
            <button onClick={() => {setPage(page - 1) }} className="teaQuizButton" type="button">Previous</button>
            <button onClick={() => {setPage(page + 1) }} className="teaQuizButton" type="button">Next</button>
            </div>
        </form>
    </div>
  )
}

export default TeaFlavor
