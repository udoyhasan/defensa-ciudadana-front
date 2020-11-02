import { createStore } from 'redux'
import {reducer} from './reducers'

import logo from '../assets/logo.png';
import textBubble from '../assets/textBubble2.png';
import textBubble2 from '../assets/textBubble3.png';
import imagen1 from '../assets/dfPeople1.png';
import imagen2 from '../assets/dfPeople2.png';
import imagen3 from '../assets/dfPeople3.png';


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
  inputIsDisplayed: false,
  appContainerClassModifierToPreventSamsungGalaxyKeyboardError: [" ifPhoneDeviceTurnGreen ", "turnVerticalAdvisor"]

} 

export let store = createStore(reducer)/*SE CREA EL ESTADO ANIDADO EL AL REDUCER*/
