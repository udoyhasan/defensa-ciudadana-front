import React from 'react';
import {store} from '../redux/store.js';
import {injectFetchedData} from '../redux/dispatchers.js';
import {rutSaverDispatcher} from '../redux/dispatchers.js';
import {loaderShowerDispatcher} from '../redux/dispatchers.js';
import {inputDisplayedAdvisorDispatcher} from '../redux/dispatchers.js'; 

export default class Input extends React.Component{
    constructor(props) {
        super(props);
        this.inputRut = React.createRef();
        this.inputRutContainer = React.createRef();
        this.errorMsg = React.createRef();


        this.state = {
            inputValue: "",
            notFound: "none"
        }
        this.fetchingData = this.fetchingData.bind(this);
        this.onChange = this.onChange.bind(this); 
        this.keyPressed = this.keyPressed.bind(this);         

      }

    fetchingData(){
        loaderShowerDispatcher("")
       rutSaverDispatcher(this.inputRut.current.value)
       fetch(store.getState().fetchBase + store.getState().fetchEndPoint + this.state.inputValue)
       .then(response => { 
           return response.json();})
       .then(data => {(!data.ok)?loaderShowerDispatcher('d-none'): console.log("")
           injectFetchedData(data);
           this.setState({notFound: "none"})
        })
        .catch(() =>{
            loaderShowerDispatcher('d-none'); 
            this.setState({notFound: "inline"})
            this.errorMsg.current.className += " position-absolute mt-5 ml-1"
            
        })
           
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
        this.inputRutContainer.current.className += " inputRutContainerPopUp ";
        inputDisplayedAdvisorDispatcher(true);
    }

    componentWillUnmount(){
        inputDisplayedAdvisorDispatcher(false);
    }

    render(){
        
        return(
        <>
        
        <div ref={this.inputRutContainer} className="input-group mb-3 p-relative" style={{bottom: this.props.bottom, left: this.props.left}}>
            <div className="input-group-prepend">
                <button onClick={this.fetchingData} className="btn btn-outline-secondary" type="button" style={{backgroundColor: "#20be2b", color: "white", fontWeight: "200px", borderStyle: "none"}}>Buscar</button>
            </div>
            <input placeholder="00.000.000-0" onKeyPress={this.keyPressed} type="text" className="form-control"  onChange={this.onChange} ref={this.inputRut}  aria-label="" aria-describedby="basic-addon1"/>
            <small ref={this.errorMsg}className="text-wrap font-weight-bold text-center pt-2" style={{margin: 'auto', color: "#569951",display: this.state.notFound}}>No se encontraron casos asociados a su rut, intenta nuevamente</small>
        </div> 
        {this.props.children}
        </>

    ) ;}

   
} 

  