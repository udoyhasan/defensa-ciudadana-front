import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component{
    constructor(props) {
        super(props);

      }

      
    render(){
        
        return(
        <>
        
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <button class="btn btn-outline-secondary" type="button" style={{backgroundColor: "#20be2b", color: "white", fontWeight: "200px", borderStyle: "none"}}>Buscar</button>
            </div>
            <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1"/>
        </div>        
        </>

    ) ;}

   
} 

  