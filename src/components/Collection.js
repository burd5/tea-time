import React, {useEffect, useState} from "react";
import { Formik, Form, Field } from 'formik'
import './collection.css'
import axios from "axios";
import Head from './Head'

function Collection() {
  
  const [teas, setTeas] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/collection`).then(res => {
      setTeas(res.data);
    })
  }, [])

  const filterCollection = async (values, res) => {
    await axios.get(`http://localhost:4000/filter`, {
      params: {
        type: values.type,
        flavor: values.flavor,
        region: values.region,
        caffeine: values.caffeine
      }
    })
  .then(res => {
    setTeas(res.data)
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
      <div className="teaList">
        {teas.map(c => <div className="teaDesc" key={c._id}>
          <ul>
            <img className="teaListImg" src={c.img} alt="" />
              <li><strong>Name:</strong> {c.name}</li>
              <li><strong>Type:</strong> {c.type}</li>
              <li><i className="teaButton fas fa-mug-hot"></i></li>
          </ul>
            </div>)}
        </div>
    </div>
  </div>
)};

export default Collection;


