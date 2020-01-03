import React from 'react';
import logo from '../img/logo.png';
import people1 from '../img/dfPeople1.png';
import people2 from '../img/dfPeople2.png';
import people3 from '../img/dfPeople3.png';
import secondaryBubble from '../img/secondaryBubble.png';
import textBubble from '../img/textBubble.png';
import {panelBtnChanger} from '../redux/dispatchers.js';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';

const miniBubbl = <img src={secondaryBubble} alt="people" style={{visibility: store.getState().showBubbles, position: "fixed", top: "10%",left: "50%", width: "5%", animation: "littleBubble1 7s linear infinite"}}/>
const miniBubb2 = <img src={textBubble} alt="people" style={{visibility: store.getState().showBubbles, position: "fixed", top: "50%",left: "50%", width: "25%", animation: "littleBubble2 7s linear infinite"}}/>
const miniBubb3 = <img src={secondaryBubble} alt="people" style={{visibility: store.getState().showBubbles, position: "fixed", top: "25%",left: "30%", width: "5%", animation: "littleBubble3 7s linear infinite"}}/>

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
<div>{miniBubbl}<img src={people1} alt="people1" style={{visibility: store.getState().showBubbles ,position: "fixed", top: "0%",left: "", width: "25%", animation: "bubble1 7s linear infinite"}}/></div>
<div>{miniBubb2}<img src={people2} alt="people2" style={{visibility: store.getState().showBubbles ,position: "fixed", top: "30%",left: "25%", width: "25%", animation: "bubble2 7s linear infinite"}}/></div>
<div>{miniBubb3}<img src={people3} alt="people3" style={{visibility: store.getState().showBubbles ,position: "fixed", top: "10%",left: "50%", width: "25%", animation: "bubble3 7s linear infinite"}}/></div>
        </>
    );

}

}

function mapStateToProps(state){

    return { frase: state.logoAnimation}

}

export default connect(mapStateToProps)(LogoGuide);