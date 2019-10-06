import {initialState} from './store'


export function reducer(state = initialState, action) {/*REDUCER*/
    
    if (action.type==="CHANGE")
    {
       return {...state, show: action.doneAction1, btnAnimation: action.doneAction2, logoAnimation: action.doneAction3};
    }
    else
    {
    return state;
    }
  }