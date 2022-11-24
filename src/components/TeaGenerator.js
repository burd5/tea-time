import React from 'react'
import { Formik, Field, Form } from 'formik'
import './teagenerator.css'

function TeaGenerator(){

    return(
    <div class="teaForm">
    <Formik
      initialValues={{
        type: '',
        flavor: '',
        region: '',
        caffeine: ''
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
        <h1 class="teagenerator">Tea Generator</h1>
          <div class="teaQuestion" id="type">Pick a type:</div>
          <div class="questions" role="group" aria-labelledby="type">
            <label>
              <Field class="answer" type="radio" name="type" value="black" />
              Black
            </label>
            <label>
              <Field class="answer" type="radio" name="type" value="green" />
              Green
            </label>
            <label>
              <Field class="answer" type="radio" name="type" value="white" />
              White
            </label>
            <label>
              <Field class="answer" type="radio" name="type" value="oolong" />
              Oolong
            </label>
            <label>
              <Field class="answer" type="radio" name="type" value="puerh" />
              Puerh
            </label>
            <label>
              <Field class="answer" type="radio" name="type" value="herbal" />
              Herbal
            </label>
            <label>
              <Field class="answer" type="radio" name="type" value="roobius" />
              Roobius
            </label>
          </div>

          <div class="teaQuestion" id="flavor">Pick a flavor:</div>
          <div class="questions" role="group" aria-labelledby="flavor">
            <label>
              <Field class="answer" type="radio" name="flavor" value="vegetal" />
              Vegetal
            </label>
            <label>
              <Field class="answer" type="radio" name="flavor" value="savory" />
              Savory
            </label>
            <label>
              <Field class="answer" type="radio" name="flavor" value="nutty" />
              Nutty/Toasty
            </label>
            <label>
              <Field class="answer" type="radio" name="flavor" value="floral" />
              Floral
            </label>
            <label>
              <Field class="answer" type="radio" name="flavor" value="earthy" />
              Earthy
            </label>
            <label>
              <Field class="answer" type="radio" name="flavor" value="fruity" />
              Fruity
            </label>
            <label>
              <Field class="answer" type="radio" name="flavor" value="sweet" />
              Sweet
            </label>
            <label>
              <Field class="answer" type="radio" name="flavor" value="mineral" />
              Mineral
            </label>
            <label>
              <Field class="answer" type="radio" name="flavor" value="spicy" />
              Spicy
            </label>
          </div>

          <div class="teaQuestion" id="region">Pick a region:</div>
          <div class="questions" role="group" aria-labelledby="region">
            <label>
              <Field class="answer" type="radio" name="region" value="china" />
              China
            </label>
            <label>
              <Field class="answer" type="radio" name="region" value="india" />
              India
            </label>
            <label>
              <Field class="answer" type="radio" name="region" value="japan" />
              Japan
            </label>
            <label>
              <Field class="answer" type="radio" name="region" value="srilanka" />
              Sri Lanka
            </label>
            <label>
              <Field class="answer" type="radio" name="region" value="africa" />
              Africa
            </label>
            <label>
              <Field class="answer" type="radio" name="region" value="all" />
              All regions
            </label>
          </div>

          <div class="teaQuestion" id="caffeine">Pick a caffeine strength:</div>
          <div class="questions" role="group" aria-labelledby="caffeine">
            <label>
              <Field class="answer" type="radio" name="caffeine" value="high" />
              High
            </label>
            <label>
              <Field class="answer" type="radio" name="caffeine" value="medium" />
              Medium
            </label>
            <label>
              <Field class="answer" type="radio" name="caffeine" value="low" />
              Low
            </label>
            <label>
              <Field class="answer" type="radio" name="caffeine" value="none" />
              None
            </label>
            <label>
              <Field class="answer" type="radio" name="caffeine" value="all" />
              All levels
            </label>
          </div>

          <button class="teaQuizButton" type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
)};
    /*const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('http://localhost:4000/formResponse', {
            params: {
                type: type,
                region: region,
                flavor: flavor,
                caffeine: caffeine
            }
        })
        .then(data => {
            console.log(data)
          })
    }


        return (
            <div className="teagenerator">
                <h1>TeaGenerator</h1>
                <div className="teaForm">
                    <form action="" className="teaQuiz">
                        <h3 className="teaQuestion">What type of tea do you want?</h3>
                        <div className="teaType">
                            <div>
                                <input type="radio" name="type" value='Green' /> Green
                            </div>
                            <div>
                                <input type="radio" name="type" value='Black' /> Black
                            </div>
                            <div>
                                <input type="radio"name="type" value='White' /> White
                            </div>
                            <div>
                                <input type="radio" name="type" value='Oolong' /> Oolong
                            </div>
                            <div>
                                <input type="radio" name="type" value='Puerh' /> Pu'erh
                            </div>
                            <div>
                                <input type="radio" name="type" value='Herbal' /> Herbal
                            </div>
                            <div>
                                <input type="radio" name="type" value='Roobius' /> Roobius
                            </div>
                        </div>

                        <h3 className="teaQuestion">What flavors are you looking for?</h3>
                        <div className="teaType">
                            <div>
                                <input type="radio" name="flavor" value='vegetal' /> Vegetal
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='savory' /> Savory
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='nutty' /> Nutty/Toasty
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='floral' /> Floral
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='earthy' /> Earthy
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='fruity' /> Fruity
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='sweet' /> Sweet
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='mineral' /> Mineral
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='spicy' /> Spicy
                            </div>
                        </div>


                        <h3 className="teaQuestion">Pick a Region:</h3>
                        <div className="teaType">
                            <div>
                                <input type="radio" name="region" value="China" /> China
                            </div>
                            <div>
                                <input type="radio" name="region" value="India" /> India
                            </div>
                            <div>
                                <input type="radio" name="region" value="Japan" /> Japan
                            </div>
                            <div>
                                <input type="radio" name="region" value="Sri Lanka" /> Sri Lanka
                            </div>
                            <div>
                                <input type="radio" name="region" value="Africa" /> Africa
                            </div>
                            <div>
                                <input type="radio" name="region" value="All" /> Include all regions
                            </div>
                        </div>

                        <h3 className="teaQuestion">Pick a caffeine level:</h3>
                        <div className="teaType">
                            <div>
                                <input type="radio" name="caffeine" value='High'/> High
                            </div>
                            <div>
                                <input type="radio" name="caffeine" value='Medium'/> Medium
                            </div>
                            <div>
                                <input type="radio" name="caffeine" value='Low'/> Low
                            </div>
                            <div>
                                <input type="radio" name="caffeine" value='None'/> None
                            </div>
                            <div>
                                <input type="radio" name="caffeine" value='All'/> All levels
                            </div>
                        </div>

                        <button className="teaQuizButton">Submit</button>
                    </form>
                </div>
            </div>
        );
}*/



export default TeaGenerator