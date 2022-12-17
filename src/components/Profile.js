import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Head from '../components/Head'
import {useUserStore} from './useStore'

export default function Profile() {

  const [teas, setTeas] = useState([]);
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore(state => state.setUser)
  const userID = useUserStore((state) => state.userID)

  useEffect(() => {
    axios.get(`http://localhost:4000/userCollection`, {
      params: {
        user: userID
      }
    }).then(res => {
      setTeas(res.data);
      console.log(res.data)
    })
  }, [])

  return (
    <div>
        <Head />
        <div className="teaList">
        {teas.length === 0 ? 'nothing' : teas.map(c => <div className="teaDesc" key={c._id}>
          <ul>
            <img className="teaListImg" src={c.img} alt="" />
              <li><strong>Name:</strong> {c.name}</li>
              <li><strong>Type:</strong> {c.type}</li>
              <li><i className="teaButton fas fa-mug-hot"></i></li>
          </ul>
          </div>)}
        </div>
    </div>
  )
}
