import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';
import {injectFetchedData} from '../redux/dispatchers.js';

export default class Input extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        }
        this.fetchingData = this.fetchingData.bind(this);
        this.onChange = this.onChange.bind(this);        

      }

    fetchingData(){console.log("funciona")
       fetch(store.getState().fetchBase + store.getState().fetchEndPoint + this.state.inputValue)
       .then(response => {return response.json();})
       .then(data => {injectFetchedData(data);})
    }

    onChange(event){//'17.402.744-7' 
    this.setState({inputValue: `"${event.target.value}"` })
    console.log("state: " , this.state.inputValue)
    }

    render(){
        
        return(
        <>
        
        <div className="input-group mb-3 p-absolute" style={{bottom: this.props.bottom}}>
            <div className="input-group-prepend">
                <button onClick={this.fetchingData} className="btn btn-outline-secondary" type="button" style={{backgroundColor: "#20be2b", color: "white", fontWeight: "200px", borderStyle: "none"}}>Buscar</button>
            </div>
            <input type="text" className="form-control"  onChange={this.onChange} placeholder="" aria-label="" aria-describedby="basic-addon1"/>
        </div>
        </>

    ) ;}

   
} 

  