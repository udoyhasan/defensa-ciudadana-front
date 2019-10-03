import React from 'react';
import logo from '../img/logo.png'
import BigContainer from './bigContainer.js'
import Button from './button.js'

export default class LogoGuide extends React.Component{

render(){
    return (
        <>
        <img src={logo} style={{position: "absolute", top: "20vh"}}/>
        </>
    );

}

}