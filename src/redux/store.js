import { createStore } from 'redux'
import {reducer} from './reducers'


export let initialState = {/*ESTADO INICIAL*/
  showBtns: "",
  btnAnimation: "",
  logoAnimation: "",
  whyUs: "" ,
  fetchedData: [],
  truePanel_falseButtonBoolean: false,
  showBubbles: "hidden"                 
} 

export let store = createStore(reducer)/*SE CREA EL ESTADO ANIDADO EL AL REDUCER*/

console.log(store.getState())/*SE MUESTRA ESTADO INICIAL */