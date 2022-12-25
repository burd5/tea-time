import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import './teagenerator.css'
import axios from 'axios'
import * as Yup from "yup";
import Head from './Head'
import { useUserStore } from './useStore'
import { Link, useNavigate } from "react-router-dom";


const AnswersSchema = Yup.object().shape({
  type: Yup.string().required('Required'),
  flavor: Yup.string().required('Required'),
  region: Yup.string().required('Required'),
  caffeine: Yup.string().required('Required'),
});

function TeaGenerator(){

  const url = `http://localhost:4000/teas`;
  const [teas, setTeas] = useState([]);
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const userID = localStorage.getItem('userID')

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  const getTeas = async (values, res) => {
    await axios.get(url, {
      params: {
        type: values.type,
        flavor: values.flavor,
        region: values.region,
        caffeine: values.caffeine
      }
    })
  .then(response => {
    const data = response.data
    setTeas(data)
    document.querySelector('.teaResults').style.display = 'block'
  })}

  const addToCollection = async (res) => {
    await axios.post(`http://localhost:4000/addTea`, userID, {
      params: {
        id: teas[0]._id,
        user: userID
      }
      })
    .then(res => {
      if(res) navigate('/profile')
    })
  }

    return(
    <div className="teaFormDiv">
    <Head />
    <div className="teaForm">
    <Formik
      initialValues={{
        type: '',
        flavor: '',
        region: '',
        caffeine: ''
      }}
      validationSchema={AnswersSchema}
      onSubmit={getTeas}>
      {({ values, errors, touched }) => (
        <Form>
        <h1 className="teagenerator">Tea Generator</h1>
          <div className="teaQuestion" id="type">Pick a type: <ErrorMessage name="type">{msg => <span style={{color: 'red', fontSize: 18}}>{'Required'}</span>}</ErrorMessage></div>
          <div className="questions" role="group" aria-labelledby="type">
            <label>
              <Field className="answer" type="radio" name="type" value="Black" />
              Black
            </label>
            <label>
              <Field className="answer" type="radio" name="type" value="Green" />
              Green
            </label>
            <label>
              <Field className="answer" type="radio" name="type" value="White" />
              White
            </label>
            <label>
              <Field className="answer" type="radio" name="type" value="Oolong" />
              Oolong
            </label>
            <label>
              <Field className="answer" type="radio" name="type" value="Puerh" />
              Puerh
            </label>
            <label>
              <Field className="answer" type="radio" name="type" value="Herbal" />
              Herbal
            </label>
            <label>
              <Field className="answer" type="radio" name="type" value="Roobius" />
              Roobius
            </label>
          </div>

          <div className="teaQuestion" id="flavor">Pick a flavor: <ErrorMessage name="flavor">{msg => <span style={{color: 'red', fontSize: 18}}>{'Required'}</span>}</ErrorMessage></div>
          <div className="questions" role="group" aria-labelledby="flavor">
            <label>
              <Field className="answer" type="radio" name="flavor" value="vegetal" />
              Vegetal
            </label>
            <label>
              <Field className="answer" type="radio" name="flavor" value="savory" />
              Savory
            </label>
            <label>
              <Field className="answer" type="radio" name="flavor" value="nutty" />
              Nutty/Toasty
            </label>
            <label>
              <Field className="answer" type="radio" name="flavor" value="floral" />
              Floral
            </label>
            <label>
              <Field className="answer" type="radio" name="flavor" value="earthy" />
              Earthy
            </label>
            <label>
              <Field className="answer" type="radio" name="flavor" value="fruity" />
              Fruity
            </label>
            <label>
              <Field className="answer" type="radio" name="flavor" value="sweet" />
              Sweet
            </label>
            <label>
              <Field className="answer" type="radio" name="flavor" value="mineral" />
              Mineral
            </label>
            <label>
              <Field className="answer" type="radio" name="flavor" value="spicy" />
              Spicy
            </label>
          </div>

          <div className="teaQuestion" id="region">Pick a region: <ErrorMessage name="region">{msg => <span style={{color: 'red', fontSize: 18}}>{'Required'}</span>}</ErrorMessage></div>
          <div className="questions" role="group" aria-labelledby="region">
            <label>
              <Field className="answer" type="radio" name="region" value="China" />
              China
            </label>
            <label>
              <Field className="answer" type="radio" name="region" value="India" />
              India
            </label>
            <label>
              <Field className="answer" type="radio" name="region" value="Japan" />
              Japan
            </label>
            <label>
              <Field className="answer" type="radio" name="region" value="Taiwan" />
              Taiwan
            </label>
            <label>
              <Field className="answer" type="radio" name="region" value="Sri Lanka" />
              Sri Lanka
            </label>
            <label>
              <Field className="answer" type="radio" name="region" value="Africa" />
              Africa
            </label>
          </div>

          <div className="teaQuestion" id="caffeine">Pick a caffeine strength: <ErrorMessage name="caffeine">{msg => <span style={{color: 'red', fontSize: 18}}>{'Required'}</span>}</ErrorMessage></div>
          <div className="questions" role="group" aria-labelledby="caffeine">
            <label>
              <Field className="answer" type="radio" name="caffeine" value="High" />
              High
            </label>
            <label>
              <Field className="answer" type="radio" name="caffeine" value="Medium" />
              Medium
            </label>
            <label>
              <Field className="answer" type="radio" name="caffeine" value="Low" />
              Low
            </label>
            <label>
              <Field className="answer" type="radio" name="caffeine" value="None" />
              None
            </label>
          </div>

          <button className="teaQuizButton" type="submit">Submit</button>
        </Form>
      )}
    </Formik>

    <div className="teaResults">
    {teas.length > 0 ? teas.map(c => <div className="teaItem" key={c._id}>
          <ul>
            <img className="teaListImg" src={c.img} alt="" />
              <li className="name"><strong>{c.name} Tea</strong></li>
              <li><strong>Type:</strong> {c.type}</li>
              <li className="profile"><strong>Profile:</strong> {c.profile}</li>
              <li className="desc"><strong>Description:</strong> {c.desc}</li>
              <li><strong>Origin:</strong> {c.region}</li>
              <li>{user === '' ? <div>
              <button className="disabledTeaButton" disabled={true}>Add to Collection</button>
              <Link to={'/login'}>
              <span className="modalTeaButton m-auto block inOut w-fit">Sign In</span>
              </Link>
              </div>
              : <button onClick={addToCollection} className="modalTeaButton">Add to Collection</button>}</li>
          </ul>
            </div> ) : <div className="noResults">Sorry, there were no results for your search.</div>}
      </div> 
  </div> 
  </div>
)};

export default TeaGenerator