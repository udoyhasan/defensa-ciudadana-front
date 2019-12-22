import React from 'react';
import logo from '../img/logo.png';
import people1 from '../img/dfPeople1.png';
import people2 from '../img/dfPeople2.png';
import people3 from '../img/dfPeople3.png';
import people4 from '../img/dfPeople4.png';
import secondaryBubble from '../img/secondaryBubble.png';
import {panelBtnChanger} from '../redux/dispatchers.js';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';

const miniBubbl = <img src={secondaryBubble} alt="people" style={{position: "absolute", top: "30%",left: "50%", width: "15%", animation: ""}}/>

export class LogoGuide extends React.Component{
    constructor(props){
        super(props);
    this.panelBtnChanger= this.panelBtnChanger.bind(this)
  
    }

    panelBtnChanger(){
        panelBtnChanger("floatDown 1.5s forwards", "logoDash 1s forwards");
        console.log(store.getState())
    }

render(){
    return (
        <>
        <img src={logo} className={this.props.bootstrapClass} alt="Defensa Ciudadana" 
        style={{position: "absolute", left: "50%",animation: store.getState().logoAnimation }} 
        onMouseOver={this.panelBtnChanger}/>
<div>{miniBubbl}<img src={people1} alt="people" style={{position: "fixed", top: "0%",left: "", width: "15%", animation: ""}}/></div>
<div>{miniBubbl}<img src={people2} alt="people" style={{position: "fixed", top: "30%",left: "", width: "15%", animation: ""}}/></div>
<div>{miniBubbl}<img src={people3} alt="people" style={{position: "fixed", top: "0%",left: "50%", width: "15%", animation: ""}}/></div>
        </>
    );

}

}

function mapStateToProps(state){

    return { frase: state.logoAnimation}

}

export default connect(mapStateToProps)(LogoGuide);