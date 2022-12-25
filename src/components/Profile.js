import React, { useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './collection.css'
import Head from '../components/Head'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


export default function Profile() {

  const [teas, setTeas] = useState([]);
  const [modalTea, setModalTea] = useState('')
  const userID = localStorage.getItem('userID')
 

  useEffect(() => {
    axios.get(`http://localhost:4000/userCollection`, {
      params: {
        userID: userID
      }})
    .then(res => {
      setTeas(res.data);
      console.log(res.data)
    })
  }, [userID])

  const [open, setOpen] = useState(false);
  const handleOpen = tea => () => {
    setOpen(true);
    setModalTea(tea)
  }
  const handleClose = () => setOpen(false);

  const deleteFromCollection = async (res) => {
    await axios.delete(`http://localhost:4000/deleteTea`, {
      params: {
        id: modalTea._id,
        user: userID
      }
      })
    .then(res => {
      if(res) window.location.reload()
    })
  }


  return (
    <div className="collections">
        <Head />
        <h1>Favorites</h1>
        <div className="teaList">
        {teas.length > 0 ? teas.map(c => <div className="teaDesc" key={c._id}>
          <ul>
              <img className="teaListImg" src={c.img} alt="" />
              <li className="text-center text-3xl mb-5 mt-5"><strong>{c.name}</strong></li>
              <li><i onClick={handleOpen(c)} className="teaButton fas fa-mug-hot"></i></li>
          </ul>
          </div>) : <div className="noFavs text-2xl font-bold bg-white p-10 rounded-xl">There are no items in your collection</div>}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box>
          <div className="modal">
            <h1 className="text-3xl pt-10 font-bold mb-10">{modalTea.name}</h1>
            <img className="modalteaListImg" src={modalTea.img} alt="tea" />
            <span className="block text-left mx-10 my-5"><strong>Origin:</strong> {modalTea.region}</span>
            <p className="text-left mx-10 my-5"><strong>Description: </strong> {modalTea.desc}</p>
            <p className="text-left mx-10 mt-5"><strong>Profile:</strong> {modalTea.profile}</p>
            <span className="block text-left mx-10 my-5"><strong>Flavor:</strong> {modalTea.flavor}</span>
            <span className="block text-left mx-10 my-5"><strong>Caffeine:</strong> {modalTea.caffeine}</span>
            <span className="block text-left mx-10 my-5"><strong>Rating:</strong> {modalTea.rating}</span>
            <div>
            <button onClick={deleteFromCollection} className="trashTeaButton"><i className="fa fa-trash"></i></button>
            </div>
          </div>
        </Box>
      </Modal>
        </div>
    </div>
  )
}
