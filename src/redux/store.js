import { createStore } from 'redux'
import {reducer} from './reducers'


export let initialState = {/*ESTADO INICIAL*/
  showBtns: "",
  btnAnimation: "",
  logoAnimation: "",
  whyUs: "" ,
  fetchedData: [],
  truePanel_falseButtonBoolean: false,
  showBubbles: "hidden",
  fetchBase: "http://127.0.0.1:5000/",
  fetchEndPoint: ""         
} 

export let store = createStore(reducer)/*SE CREA EL ESTADO ANIDADO EL AL REDUCER*/
