import { createStore } from 'redux'
import {reducer} from './reducers'


export let initialState = {/*ESTADO INICIAL*/
  show: "",
  btnAnimation: "",
  logoAnimation: "",
  whyUs: "" ,
  fetchedData: ""                     
} 

export let store = createStore(reducer)/*SE CREA EL ESTADO ANIDADO EL AL REDUCER*/

console.log(store.getState())/*SE MUESTRA ESTADO INICIAL */