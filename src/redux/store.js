import { createStore } from 'redux'


let initialState = {/*ESTADO INICIAL*/
  btnPanel: false,
  logoAnimation: ""                                  
} 

export let store = createStore(reducer)/*SE CREA EL ESTADO*/

function reducer(state = initialState, action) {/*REDUCER*/
  return Object.assign({},state, action)
}

console.log(store.getState())/*SE MUESTRA ESTADO INICIAL */