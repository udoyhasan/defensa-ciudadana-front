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

    onChange(event){

        let targetValue = event.target.value;
        let n

        let split = targetValue.split("");

        split.includes("-")? split.splice(split.indexOf("-"),1): n= null;
        split.includes(".")? split.splice(split.indexOf("."),1): n= null;
        split.includes(".")? split.splice(split.indexOf("."),1): n= null;
        
        split[split.length-1] = "-" + split[split.length-1]

        split.length >5 ? split[split.length-4] = "." + split[split.length-4]: n= null;
        split.length >7 ? split[split.length-7] = "." + split[split.length-7]: n= null;

        event.target.value = split.join("")
        
        this.setState({inputValue: `"${event.target.value}"` });
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

  