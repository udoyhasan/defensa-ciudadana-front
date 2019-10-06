import {initialState} from './store'


export function reducer(state = initialState, action) {/*REDUCER*/
    
    if (action.type==="CHANGE")
    {
       return {...state, show: action.doneAction1, logoAnimation: action.doneAction2};
    }
    else
    {
    return state;
    }
  }