import React from 'react';
import logo from '../img/logo.png'
import {panelBtnChanger} from '../redux/dispatchers.js'


export default class LogoGuide extends React.Component{

render(){
    return (
        <>
        <img src={logo} alt="Defensa Ciudadana"style={{position: "absolute", top: "20vh"}} onClick={panelBtnChanger}/>
        </>
    );

}

}