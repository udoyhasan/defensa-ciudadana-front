/*NO ES OBLIGATORIO EN REDUX HACER ESTO, PERO ES MEJOR PARA LA REUTILIZACIÓN Y SIMPLICIDAD DEL CODIGO */
import {store} from './store.js'
import {changeVisibility} from '../redux/actionsFunctionCreators.js'
import {fetchData} from '../redux/actionsFunctionCreators.js'

export const panelBtnChanger = ()=>{store.dispatch(changeVisibility("floatDown 2s forwards", "logoDash 1s forwards"));};

export const injectFetchedData = (data) =>{store.dispatch(fetchData(data));};
