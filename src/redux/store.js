import { createStore } from 'redux'
import {reducer} from './reducers'

import logo from '../img/logo.png';
import textBubble from '../img/textBubble2.png';
import textBubble2 from '../img/textBubble3.png';
import imagen1 from '../img/dfPeople1.png';
import imagen2 from '../img/dfPeople2.png';
import imagen3 from '../img/dfPeople3.png';


export let initialState = {/*ESTADO INICIAL*/
  backArrowAnimation: "d-none",
  showBtns: "",
  show:"",
  btnAnimation: "",
  logoAnimation: "",
  whyUs: "" ,
  whyUsImagesDisplayedOnAnimatiton: {img: logo, zise: "", left: "50%", position: 'relative'} ,
  fetchedData: {resp: []},
  whatCaseWasClicked: "",
  truePanel_falseButtonBoolean: false,
  showBubbles: "hidden",
  fetchBase: "http://guillermopiedrabuena.pythonanywhere.com/",
  fetchEndPoint: "",
  eventIhibitor: false,
  rutSaver:"",
  showLoader: "d-none",
  inputIsDisplayed: false

} 

export let store = createStore(reducer)/*SE CREA EL ESTADO ANIDADO EL AL REDUCER*/
