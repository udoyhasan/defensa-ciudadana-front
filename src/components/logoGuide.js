import React from 'react';
import logo from '../img/logo.png'
import {panelBtnChanger} from '../redux/dispatchers.js'
import { connect } from 'react-redux';
import {store} from '../redux/store.js'


export class LogoGuide extends React.Component{

render(){
    return (
        <>
        <img src={logo} className="mr-5" alt="Defensa Ciudadana" 
        style={{position: "absolute", right: "0%", top: "20vh", animation: store.getState().logoAnimation }} 
        onMouseOver={panelBtnChanger}/>
        </>
    );

}

}

function mapStateToProps(state){

    return { frase: state.logoAnimation}

}

export default connect(mapStateToProps)(LogoGuide);