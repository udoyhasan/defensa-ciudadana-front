import {initialState} from './store'


export function reducer(state = initialState, action) {/*REDUCER*/
    
    if (action.type==="DISPLAY_INTRO")
    {
       return {...state, show: action.doneAction1, logoAnimation: action.doneAction2};
    }
    else if(action.type==="INJECT_FETCHED_DATA"){
      return {...state, fetchedData: action.doneAction};
    }
    else
    {
    return state;
    }
  }