import React from 'react'
import './teaform.css'

const TeaType = ({page, setPage, formData, setFormData}) => {
  return (
    <div className="teaForm">
            <h3 className="teaQuestion">What type of tea do you want?</h3>
            <div className="teaType">
                <div>
                <input type="radio" name="Type" value={formData.type} onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })}/> Green 
                </div>
                <div>
                <input type="radio" name="Type" value={formData.type} onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })}/> Black
                </div>
                <div>
                <input type="radio" name="Type" value={formData.type} onClick={(e) =>
                setFormData({ ...formData, type: e.target.value })}/> White 
                </div>
                <div>
                <input type="radio" name="Type" value={formData.type} onClick={(e) =>
                setFormData({ ...formData, type: e.target.value })}/> Oolong
                </div>  
                <div>  
                <input type="radio" name="Type" value={formData.type} onClick={(e) =>
                setFormData({ ...formData, type: e.target.value })}/> Pu'erh
                </div>
                <div>    
                <input type="radio" name="Type" value={formData.type} onClick={(e) =>
                setFormData({ ...formData, type: e.target.value })}/> Herbal 
                </div> 
                <div>  
                <input type="radio" name="Type" value={formData.type} onClick={(e) =>
                setFormData({ ...formData, type: e.target.value })}/> Roobius
                </div>
            </div>   
            <button onClick={() => {setPage(page + 1); console.log(formData) }} className="teaQuizButton" type="button">Next</button>
    </div>
  )
}

export default TeaType
