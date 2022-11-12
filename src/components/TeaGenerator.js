import React, { useState} from 'react'
import './teagenerator.css'
import axios from "axios";


function TeaGenerator(){
    
    const [type, setType] = useState()

    const handleTypeChange = (e) => {
        setType(e.target.value)
    }

    const [region, setRegion] = useState()

    const handleRegionChange = (e) => {
        setRegion(e.target.value)
    }

    const [flavor, setFlavor] = useState()

    const handleFlavorChange = (e) => {
        setFlavor(e.target.value)
    }

    const [caffeine, setCaffeine] = useState()

    const handleCaffeineChange = (e) => {
        setCaffeine(e.target.value)
    }


    
        
        
        /*const value = e.target.value;
        const checked = e.target.checked;
        console.log(value, checked);
        if(checked){
            setCheckboxes([
                ...checkboxes, value
            ])
        } else{
            setCheckboxes(checkboxes.filter( (e) => (e !== value)))
        }
    }*/

    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('http://localhost:4000/formResponse', {
            params: {
                type: type,
                region: region,
                flavor: flavor,
                caffeine: caffeine
            }
        })
        .then(res => {
            res.send()
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
                                <input type="radio" name="type" value='Green' onChange={handleTypeChange} /> Green
                            </div>
                            <div>
                                <input type="radio" name="type" value='Black' onChange={handleTypeChange}/> Black
                            </div>
                            <div>
                                <input type="radio"name="type" value='White' onChange={handleTypeChange} /> White
                            </div>
                            <div>
                                <input type="radio" name="type" value='Oolong' onChange={handleTypeChange} /> Oolong
                            </div>
                            <div>
                                <input type="radio" name="type" value='Puerh' onChange={handleTypeChange} /> Pu'erh
                            </div>
                            <div>
                                <input type="radio" name="type" value='Herbal' onChange={handleTypeChange} /> Herbal
                            </div>
                            <div>
                                <input type="radio" name="type" value='Roobius' onChange={handleTypeChange} /> Roobius
                            </div>
                        </div>

                        <h3 className="teaQuestion">What flavors are you looking for?</h3>
                        <div className="teaType">
                            <div>
                                <input type="radio" name="flavor" value='vegetal' onChange={handleFlavorChange}/> Vegetal
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='savory' onChange={handleFlavorChange}/> Savory
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='nutty' onChange={handleFlavorChange}/> Nutty/Toasty
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='floral' onChange={handleFlavorChange}/> Floral
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='earthy' onChange={handleFlavorChange}/> Earthy
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='fruity' onChange={handleFlavorChange}/> Fruity
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='sweet' onChange={handleFlavorChange}/> Sweet
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='mineral' onChange={handleFlavorChange}/> Mineral
                            </div>
                            <div>
                                <input type="radio" name="flavor" value='spicy' onChange={handleFlavorChange}/> Spicy
                            </div>
                        </div>


                        <h3 className="teaQuestion">Pick a Region:</h3>
                        <div className="teaType">
                            <div>
                                <input type="radio" name="region" value="China" onChange={handleRegionChange}/> China
                            </div>
                            <div>
                                <input type="radio" name="region" value="India" onChange={handleRegionChange}/> India
                            </div>
                            <div>
                                <input type="radio" name="region" value="Japan" onChange={handleRegionChange} /> Japan
                            </div>
                            <div>
                                <input type="radio" name="region" value="Sri Lanka" onChange={handleRegionChange}/> Sri Lanka
                            </div>
                            <div>
                                <input type="radio" name="region" value="Africa" onChange={handleRegionChange}/> Africa
                            </div>
                            <div>
                                <input type="radio" name="region" value="All" onChange={handleRegionChange} /> Include all regions
                            </div>
                        </div>

                        <h3 className="teaQuestion">Pick a caffeine level:</h3>
                        <div className="teaType">
                            <div>
                                <input type="radio" name="caffeine" value='High' onChange={handleCaffeineChange} /> High
                            </div>
                            <div>
                                <input type="radio" name="caffeine" value='Medium' onChange={handleCaffeineChange}/> Medium
                            </div>
                            <div>
                                <input type="radio" name="caffeine" value='Low' onChange={handleCaffeineChange}/> Low
                            </div>
                            <div>
                                <input type="radio" name="caffeine" value='None' onChange={handleCaffeineChange}/> None
                            </div>
                            <div>
                                <input type="radio" name="caffeine" value='All' onChange={handleCaffeineChange}/> All levels
                            </div>
                        </div>

                        <button onClick={handleSubmit} className="teaQuizButton">Submit</button>
                    </form>
                </div>
            </div>
        );
}



export default TeaGenerator