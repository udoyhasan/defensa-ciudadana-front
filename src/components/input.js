import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';
import {injectFetchedData} from '../redux/dispatchers.js';

export default class Input extends React.Component{
    constructor(props) {
        super(props);

      }

      fetchingData(){
        fetch('http://127.0.0.1:5000/casosyclientes')//https://swapi.co/api/people/
        .then(response => response.json())
        .then(data => {injectFetchedData(data.results); console.log(`este es el store luego del fetch: ${store.getState().fetchedData}`)})
        // PARA DESABILITAR CORS: chrome.exe --disable-web-security
    }
    render(){
        
        return(
        <>
        
        <div className="input-group mb-3 p-absolute" style={{bottom: this.props.bottom}}>
            <div className="input-group-prepend">
                <button onClick={this.fetchingData} className="btn btn-outline-secondary" type="button" style={{backgroundColor: "#20be2b", color: "white", fontWeight: "200px", borderStyle: "none"}}>Buscar</button>
            </div>
            <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1"/>
        </div>        
        </>

    ) ;}

   
} 

  