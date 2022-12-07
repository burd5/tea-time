import React, {useEffect, useState} from "react";
import './collection.css'
import axios from "axios";

function Collection() {
  
  const [teas, setTeas] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/collection`).then(res => {
      setTeas(res.data);
    })
  }, [])

  return (
  
  <div className="collections">
    <h1 className="collectionsTitle">Collection</h1>
      <form className="filterCat">
        <label htmlFor="type">Type</label>
        <select name="type" id="type">
          <option value=""></option>
          <option value="black">Black</option>
          <option value="black">Green</option>
          <option value="black">White</option>
          <option value="black">Herbal</option>
          <option value="black">Roobius</option>
          <option value="black">Oolong</option>
        </select>
        <label htmlFor="region">Region</label>
        <select name="region" id="region">
          <option value=""></option>
          <option value="china">China</option>
          <option value="japan">Japan</option>
          <option value="india">India</option>
          <option value="africa">Africa</option>
          <option value="srilanka">Sri Lanka</option>
        </select>
        <label htmlFor="flavor">Flavor</label>
        <select name="flavor" id="flavor">
          <option value=""></option>
          <option value="vegetal">Vegetal</option>
          <option value="savory">Savory</option>
          <option value="sweet">Sweet</option>
          <option value="nutty">Nutty/Toasty</option>
          <option value="floral">Floral</option>
          <option value="earthy">Earthy</option>
          <option value="fruity">Fruity</option>
          <option value="mineral">Mineral</option>
          <option value="spicy">Spicy</option>
        </select>
        <label htmlFor="caffeine">Caffeine</label>
        <select name="caffeine" id="caffeine">
          <option value=""></option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="none">None</option>
        </select>
        <button className="teaSearchButton" type="submit">Search</button>
      </form>
    <div>
      <div className="teaList">
        {teas.map(c => <div className="teaDesc" key={c._id}>
          <ul>
            <img className="teaListImg" src={c.img} alt="" />
              <li><strong>Name:</strong> {c.name}</li>
              <li><strong>Type:</strong> {c.type}</li>
              <li className="profile"><strong>Profile:</strong> {c.profile}</li>
              <li><strong>Region:</strong> {c.region}</li>
              <li><i className="teaButton fas fa-mug-hot"></i></li>
          </ul>
            </div>)}
        </div>
    </div>
  </div>
)};

export default Collection;


