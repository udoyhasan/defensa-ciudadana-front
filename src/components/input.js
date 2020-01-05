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
        fetch(store.getState().fetchBase + store.getState().fetchEndPoint)
        .then(response => {return response.json();})
        .then(data => {
            console.log(data); 
            injectFetchedData(data); 
             return data })
        
        
    }
    render(){
        
        return(
        <>
        
        <div className="input-group mb-3 p-absolute" style={{bottom: this.props.bottom}}>
            <div className="input-group-prepend">
                <button onClick={this.fetchingData} className="btn btn-outline-secondary" type="button" style={{backgroundColor: "#20be2b", color: "white", fontWeight: "200px", borderStyle: "none"}}>Buscar</button>
            </div>
            <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1"/>
        </div>{store.getState().fetchedData[0]}
        </>

    ) ;}

   
} 

  