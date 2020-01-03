/*NO ES OBLIGATORIO EN REDUX HACER ESTO, PERO ES MEJOR PARA LA REUTILIZACIÓN Y SIMPLICIDAD DEL CODIGO */
import {store} from './store.js'
import {changeVisibility} from '../redux/actionsFunctionCreators.js'
import {fetchData} from '../redux/actionsFunctionCreators.js'
import {changeBoolean} from '../redux/actionsFunctionCreators.js'
import {showBubbleCreator} from '../redux/actionsFunctionCreators.js'

export const panelBtnChanger = (criteria1,criteria2)=>{store.dispatch(changeVisibility(criteria1,criteria2));};

export const injectFetchedData = (data) =>{store.dispatch(fetchData(data));};

export const truePanel_falseButtonSet_handler = (boolean) =>{store.dispatch(changeBoolean(boolean));};

export const showBubble = (visibility) =>{store.dispatch(showBubbleCreator(visibility));};
