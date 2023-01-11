import React, {useEffect, useState} from "react";
import { Formik, Form, Field } from 'formik'
import './collection.css'
import axios from "axios";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Head from './Head'
import CircularProgress from '@mui/material/CircularProgress';
import { useUserStore } from './useStore'
import { Link, useNavigate } from "react-router-dom";

function Collection() {

  const [teas, setTeas] = useState([]);
  const [modalTea, setModalTea] = useState('')
  const [match, setExactMatch] = useState([])
  const [type, setType] = useState([])
  const [flavor, setFlavor] = useState([])
  const [modalFlavors, setModalFlavors] = useState([])
  const [region, setRegion] = useState([])
  const [caffeine, setCaffeine] = useState([])
  const [typeHead, setTypeHead] = useState('')
  const [flavorHead, setFlavorHead] = useState('')
  const [regionHead, setRegionHead] = useState('')
  const [caffeineHead, setCaffeineHead] = useState('')
  const [conditionValues, setConditionValues] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const userID = localStorage.getItem('userID')

  
  useEffect(() => {
    setIsLoading(true)
    axios.get('https://teatime.cyclic.app/collection').then(res => {
      setTeas(res.data);
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  const [open, setOpen] = useState(false);
  const handleOpen = tea => () => {
    setOpen(true);
    setModalTea(tea)
    setModalFlavors(tea.flavor)
  }
  const handleClose = () => setOpen(false);

  const addToCollection = async (res) => {
    await axios.post('https://teatime.cyclic.app/addTea', {modalTea}, {
      params: {
        id: modalTea._id,
        user: userID
      }
      })
    .then(res => {
      if(res) navigate('/profile')
    })
  }

  const filterCollection = async (values, res) => {
    await axios.get('https://teatime.cyclic.app/filter', {
      params: {
        type: values.type,
        flavor: values.flavor,
        region: values.region,
        caffeine: values.caffeine
      }
    })
  .then(res => {
    setExactMatch(res.data.exactSearch)
    setType(res.data.teaType)
    setFlavor(res.data.teaFlavor)
    setRegion(res.data.teaRegion)
    setCaffeine(res.data.teaCaffeine)
    setTypeHead(res.data.type)
    setFlavorHead(res.data.flavor)
    setCaffeineHead(res.data.caffeine)
    setRegionHead(res.data.region)
    setConditionValues(Object.values(res.data.conditions))
   
    document.querySelector('.matchResultDiv').style.display = 'block'
  })}

  return (
  
  <div className="collections">
    <Head />
    <h1 className="collectionsTitle">Collection</h1>
    <Formik
      initialValues={{
        type: "",
        flavor: "",
        region: "",
        caffeine: ""
      }}
      onSubmit={filterCollection}>
      {({ values }) => (
      <Form className="filterCat">
        <label htmlFor="type">Type</label>
        <Field as="select" name="type">
          <option value=""></option>
          <option value="Black">Black</option>
          <option value="Green">Green</option>
          <option value="White">White</option>
          <option value="Herbal">Herbal</option>
          <option value="Roobius">Roobius</option>
          <option value="Oolong">Oolong</option>
        </Field>
        <label htmlFor="region">Region</label>
        <Field as="select" name="region">
          <option value=""></option>
          <option value="China">China</option>
          <option value="Japan">Japan</option>
          <option value="India">India</option>
          <option value="Africa">Africa</option>
          <option value="Sri Lanka">Sri Lanka</option>
        </Field>
        <label htmlFor="flavor">Flavor</label>
        <Field as="select" name="flavor">
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
        </Field>
        <label htmlFor="caffeine">Caffeine</label>
        <Field as="select" name="caffeine">
          <option value=""></option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
          <option value="None">None</option>
        </Field>
        <button onSubmit={filterCollection} className="teaSearchButton" type="submit">Search</button>
      </Form>
      )}
      </Formik>
    <div>
    <div>
    {isLoading === true ? <Box sx={{ display: 'flex', justifyContent: 'center', margin: 'auto', height: 500  }}><CircularProgress sx={{ color: 'rgb(60, 11, 69)'}}/></Box> : <div></div>}
    </div>
    <div className="matchResultDiv" style={{display: 'none'}}>
    {match.length === 0 || conditionValues.length === 0 ? <div><h2 className="searchHeader">Exact Match</h2><h5 className="font-sans text-2xl mb-10">No exact matches for your search</h5></div> : <h2 className="searchHeader">Exact Match <span>({conditionValues.map( (value,index) => index !== conditionValues.length - 1 ? value[0].toUpperCase() + value.slice(1) + ' ' + '&' + ' ' : value[0].toUpperCase() + value.slice(1))})</span></h2>}
    {match.length === 0 ? <div style={{display: 'none'}} className="teaList"></div> : <div className="teaList">
        {match.map(c => <div className="teaDesc" key={c._id}>
          <ul>
            <img className="teaListImg" src={c.img} alt="" />
              <li className="mt-5 mb-5"><strong>Name:</strong> {c.name}</li>
              <li><i onClick={handleOpen(c)} className="teaButton fas fa-mug-hot"></i></li>
          </ul>
          </div>)}
      </div>}
    </div>
      {type.length === 0 ? <div style={{display: 'none'}}></div> : <h2 className="searchHeader">All Teas (Type: {typeHead})</h2>}
      {type.length === 0 ? <div style={{display: 'none'}} className="teaList"></div> : <div className="teaList">
        {type.map(c => <div className="teaDesc" key={c._id}>
          <ul>
            <img className="teaListImg" src={c.img} alt="" />
              <li className="mt-5 mb-5"><strong>Name:</strong> {c.name}</li>
              <li><i onClick={handleOpen(c)} className="teaButton fas fa-mug-hot"></i></li>
          </ul>
          </div>)}
      </div>}
      {caffeine.length === 0 ? <div style={{display: 'none'}}></div> : <h2 className="searchHeader">All Teas ({caffeineHead} Caffeine)</h2>}
      {caffeine.length === 0 ? <div style={{display: 'none'}} className="teaList"></div> : <div className="teaList">
        {caffeine.map(c => <div className="teaDesc">
          <ul>
            <img className="teaListImg" src={c.img} alt="" />
              <li className="mt-5 mb-5"><strong>Name:</strong> {c.name}</li>
              <li><i onClick={handleOpen(c)} className="teaButton fas fa-mug-hot"></i></li>
          </ul>
          </div>)}
      </div>}
      {flavor.length === 0 ? <div style={{display: 'none'}}></div> : <h2 className="searchHeader">All Teas (Flavor: {flavorHead[0].toUpperCase() + flavorHead.slice(1)})</h2>}
      {flavor.length === 0 ? <div style={{display: 'none'}} className="teaList"></div> : <div className="teaList">
        {flavor.map(c => <div className="teaDesc" key={c._id}>
          <ul>
            <img className="teaListImg" src={c.img} alt="" />
              <li className="mt-5 mb-5"><strong>Name:</strong> {c.name}</li>
              <li><i onClick={handleOpen(c)} className="teaButton fas fa-mug-hot"></i></li>
          </ul>
          </div>)}
      </div>}
      {region.length === 0 ? <div style={{display: 'none'}}></div> : <h2 className="searchHeader">All Teas (Region: {regionHead})</h2>}
      {region.length === 0 ? <div style={{display: 'none'}} className="teaList"></div> : <div className="teaList">
        {region.map(c => <div className="teaDesc" key={c._id}>
          <ul>
            <img className="teaListImg" src={c.img} alt="" />
              <li className="mt-5 mb-5"><strong>Name:</strong> {c.name}</li>
              <li><i onClick={handleOpen(c)} className="teaButton fas fa-mug-hot"></i></li>
          </ul>
          </div>)}
      </div>}
      {match.length > 0 || type.length > 0 || region.length > 0 || flavor.length > 0 || caffeine.length > 0 ? <div style={{display:'none'}}></div> : 
      <div className="teaList">
        {teas.map(c => <div className="teaDesc" key={c._id}>
          <ul>
            <img className="teaListImg" src={c.img} alt="" />
              <li className="mt-5 mb-5"><strong>Name:</strong> {c.name}</li>
              <li><i onClick={handleOpen(c)} className="teaButton fas fa-mug-hot"></i></li>
          </ul>
          </div>)}
        </div>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box>
          <div className="modal">
            <h1 className="modalTeaName text-3xl pt-10 font-bold mb-10">{modalTea.name}</h1>
            <img className="modalteaListImg" src={modalTea.img} alt="tea" />
            <span className="block text-left mx-10 my-5"><strong>Origin:</strong> {modalTea.region}</span>
            <p className="text-left mx-10 my-5"><strong>Description: </strong> {modalTea.desc}</p>
            <p className="text-left mx-10 mt-5"><strong>Profile:</strong> {modalTea.profile}</p>
            <span className="block text-left mx-10 my-5"><strong>Flavor:</strong> {modalFlavors.map( (e, index) => index !== modalFlavors.length - 1 ? <span key={e}> {e + ',' + ' '}</span> : <span key={e}> {e} </span>)}</span>
            <span className="block text-left mx-10 my-5"><strong>Caffeine:</strong> {modalTea.caffeine}</span>
            <div>
            {user === '' ? <div>
              <button className="disabledTeaButton" disabled={true}>Add to Collection</button>
              <Link to={'/login'}>
              <span className="modalTeaButton m-auto block inOut w-fit">Sign In</span>
              </Link>
              </div>
              : <button onClick={addToCollection} className="modalTeaButton">Add to Collection</button>}
            </div>
          </div>
        </Box>
      </Modal>
        </div>
    </div>

)};

export default Collection;


