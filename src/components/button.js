import React from 'react';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';


export function Button(props){

        return( 
           <>   
             <button id={props.id} onClick={props.click} type="button" className="btn btn-secondary d-block mb-3 w-100" style={{width: "60%", cursor: "pointer"}}>{props.children}</button>

           </> 

        );

}