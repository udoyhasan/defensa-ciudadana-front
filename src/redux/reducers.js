import {initialState} from './store'


export function reducer(state = initialState, action) {/*REDUCER*/
    
    if (action.type==="DISPLAY_INTRO")
    {
       return {...state, show: action.doneAction1, logoAnimation: action.doneAction2};
    }
    else if(action.type==="INJECT_FETCHED_DATA"){
      return {...state, fetchedData: action.doneAction};
    }
    else if(action.type==="CHANGE_BOOLEAN"){
      return {...state, truePanel_falseButtonBoolean: action.doneAction};
    }
    else if(action.type==="CHANGE_BOOBLE_VISIBILITY"){
      return {...state, showBubbles: action.doneAction};
    }
    else if(action.type==="CHANGE_ENDPOINT"){
      return {...state, fetchEndPoint: action.doneAction};
    }
    else if(action.type==="INJECT_CASE"){
      return {...state, whatCaseWasClicked: action.doneAction};
    }
    else if(action.type==="CHANGE_IMAGE"){
      return {...state, whyUsImagesDisplayedOnAnimatiton:action.doneAction};
    }
    else if(action.type==="CANCELL_EVENT"){
      return {...state, eventIhibitor:action.doneAction};
    }
    else if(action.type==="SAVE_RUT"){
      return {...state, rutSaver:action.doneAction};
    }
    else
    {
    return state;
    }
  }