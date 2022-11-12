import React from 'react'
import './teaform.css'

function TeaRegion({page, setPage, formData, setFormData}) {
  return (
    <div className="teaForm">
        <form action="">
            <h3 className="teaQuestion">Pick a Region:</h3>
            <div className="teaType">
                <div>
                <input type="checkbox" name="type" value={formData.region} onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })}/> China
                </div>
                <div>
                <input type="checkbox" name="type" value={formData.region} onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })}/> India
                </div>
                <div>
                <input type="checkbox" name="type" value={formData.region} onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })}/> Japan
                </div>
                <div>
                <input type="checkbox" name="type" value={formData.region} onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })}/> Sri Lanka
                </div>  
                <div>  
                <input type="checkbox" name="type" value={formData.region} onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })}/> Africa
                </div>
                <div>    
                <input type="checkbox" name="type" value={formData.region} onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })}/> Include all regions 
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

export default TeaRegion