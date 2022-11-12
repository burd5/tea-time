import React, {useEffect, useState} from "react";
import './collection.css'
import axios from "axios";

function Collection() {
  const url = 'http://localhost:4000/teas';
  const [teas, setTeas] = useState([]);

  useEffect(() => {
    axios.get(url).then(res => {
      setTeas(res.data);
    })
  }, [])

  return <div className="collections">
    <h1>Collection</h1>
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
};

export default Collection;


