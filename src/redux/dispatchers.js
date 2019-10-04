/*NO ES OBLIGATORIO EN REDUX HACER ESTO, PERO ES MEJOR PARA LA REUTILIZACIÓN Y SIMPLICIDAD DEL CODIGO */
import {changeBoolean} from '../redux/actionsFunctionCreators.js'
import {store} from './store.js'

export const panelBtnChanger = ()=>{store.dispatch(changeBoolean(true)); console.log(store.getState())};