import React from 'react';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';

export function JobsContainer(props){

        return(
           <div className='container mt-5 pt-5'>   
                {props.children}
           </div> 

        );

}

