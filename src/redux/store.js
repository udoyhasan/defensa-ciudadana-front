import { createStore } from 'redux'
import {reducer} from './reducers'

import logo from '../img/logo.png';
import textBubble from '../img/textBubble2.png';
import textBubble2 from '../img/textBubble3.png';
import imagen1 from '../img/dfPeople1.png';
import imagen2 from '../img/dfPeople2.png';
import imagen3 from '../img/dfPeople3.png';


export let initialState = {/*ESTADO INICIAL*/
  showBtns: "",
  btnAnimation: "",
  logoAnimation: "",
  whyUs: "" ,
  whyUsImagesDisplayedOnAnimatiton: {img: logo, zise: "80%", left: "50%"} ,
  fetchedData: {resp: []},
  whatCaseWasClicked: "",
  truePanel_falseButtonBoolean: false,
  showBubbles: "hidden",
  fetchBase: "http://guillermopiedrabuena.pythonanywhere.com/",
  fetchEndPoint: "",
  eventIhibitor: false,
  rutSaver:"",
  showLoader: "d-none"

} 

export let store = createStore(reducer)/*SE CREA EL ESTADO ANIDADO EL AL REDUCER*/
