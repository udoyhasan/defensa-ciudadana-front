import React from 'react';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';


export default function Button(props){

        return( 
           <>   
             <button id={props.id} onClick={props.onClickFunction} type="button" className={`btn btn-secondary d-block mb-3 w-100 ${props.aditionalClassName}`} style={{width: "60%", cursor: "pointer"}}>{props.children}</button>

           </> 

        );

}