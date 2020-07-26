import React from 'react';
import {store} from '../redux/store.js';
import {injectFetchedData} from '../redux/dispatchers.js';
import {rutSaverDispatcher} from '../redux/dispatchers.js';
import {loaderShowerDispatcher} from '../redux/dispatchers.js';

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
        loaderShowerDispatcher('')
       rutSaverDispatcher(this.inputRut.current.value)
       fetch(store.getState().fetchBase + store.getState().fetchEndPoint + this.state.inputValue)
       .then(response => { (!response.ok)?loaderShowerDispatcher('d-none'): console.log("aun no llega")
           return response.json();})
       .then(data => {
           injectFetchedData(data);})
           
    }

    keyPressed(event) {
        if (event.key === "Enter") {
            rutSaverDispatcher(this.inputRut.current.value)
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
        this.setState({inputValue: `${event.target.value}` });

    }

    componentDidMount(){
        this.inputRut.current.focus()
    }

    render(){
        
        return(
        <>
        
        <div className="input-group mb-3 p-absolute" style={{bottom: this.props.bottom}}>
            <div className="input-group-prepend">
                <button onClick={this.fetchingData} className="btn btn-outline-secondary" type="button" style={{backgroundColor: "#20be2b", color: "white", fontWeight: "200px", borderStyle: "none"}}>Buscar</button>
            </div>
            <input placeholder="ingrese su rut" onKeyPress={this.keyPressed} type="text" className="form-control"  onChange={this.onChange} ref={this.inputRut}  aria-label="" aria-describedby="basic-addon1"/>
        </div>
        </>

    ) ;}

   
} 

  