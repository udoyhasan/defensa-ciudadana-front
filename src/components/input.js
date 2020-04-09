import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';
import {injectFetchedData} from '../redux/dispatchers.js';
import {rutSaverDispatcher} from '../redux/dispatchers.js';

export default class Input extends React.Component{
    constructor(props) {
        super(props);
        this.inputRut = React.createRef();


        this.state = {
            inputValue: ""
        }
        this.fetchingData = this.fetchingData.bind(this);
        this.onChange = this.onChange.bind(this); 
        this.keyPressed = this.keyPressed.bind(this);         

      }

    fetchingData(){

       rutSaverDispatcher(this.inputRut.current.value)
       console.log(store.getState())
       fetch(store.getState().fetchBase + store.getState().fetchEndPoint + this.state.inputValue)
       .then(response => {return response.json();})
       .then(data => {
           injectFetchedData(data);})
           
    }

    keyPressed(event) {
        if (event.key === "Enter") {
            this.fetchingData();
            
        }
      }

    onChange(event){

       

        let targetValue = event.target.value;
        let falseCase;

        let split = targetValue.split("");

        split.includes("-")? split.splice(split.indexOf("-"),1): falseCase= null;
        split.includes(".")? split.splice(split.indexOf("."),1): falseCase= null;
        split.includes(".")? split.splice(split.indexOf("."),1): falseCase= null;
        
        (split.length>=2)?split[split.length-1] = "-" + split[split.length-1]:falseCase= null;

        split.length >5 ? split[split.length-4] = "." + split[split.length-4]: falseCase= null;
        split.length >7 ? split[split.length-7] = "." + split[split.length-7]: falseCase= null;

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
            <input onKeyPress={this.keyPressed} type="text" className="form-control"  onChange={this.onChange} placeholder="" ref={this.inputRut}  aria-label="" aria-describedby="basic-addon1"/>
        </div>
        </>

    ) ;}

   
} 

  