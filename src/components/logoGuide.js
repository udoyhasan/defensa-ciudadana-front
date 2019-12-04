import React from 'react';
import logo from '../img/logo.png';
import {panelBtnChanger} from '../redux/dispatchers.js';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';


export class LogoGuide extends React.Component{
    constructor(props){
        super(props);
        

    }

render(){
    return (
        <>
        <img src={logo} className={this.props.bootstrapClass} alt="Defensa Ciudadana" 
        style={{position: "absolute", left: "50%",animation: store.getState().logoAnimation }} 
        onMouseOver={panelBtnChanger}/>
        </>
    );

}

}

function mapStateToProps(state){

    return { frase: state.logoAnimation}

}

export default connect(mapStateToProps)(LogoGuide);