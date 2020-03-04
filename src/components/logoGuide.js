import React from 'react';
import logo from '../img/logo.png';
import textBubble from '../img/textBubble2.png';
import textBubble2 from '../img/textBubble3.png';
import imagen1 from '../img/dfPeople1.png';
import imagen2 from '../img/dfPeople2.png';
import imagen3 from '../img/dfPeople3.png';
import {panelBtnChanger} from '../redux/dispatchers.js';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';

import {truePanel_falseButtonSet_handler} from '../redux/dispatchers.js';


export class LogoGuide extends React.Component{
    constructor(props){
        super(props);
    this.state = {
        img: logo, 
        zise: "80%", 
        left:"50%", 
        rotate: "rotateY(0)", 
        onclickAnimationBoolean: false, 
        eventInhibitor: false
    }
    this.panelBtnChanger= this.panelBtnChanger.bind(this);
    this.onclickAnimationFunction= this.onclickAnimationFunction.bind(this);

    }

    panelBtnChanger(){console.log(store.getState().eventIhibitor)
        if(store.getState().eventIhibitor!=true)
        {console.log(store.getState().eventIhibitor)
              panelBtnChanger("floatDown 1.5s forwards", "logoDash 1s forwards");
            
        }
    

    }


    onclickAnimationFunction(){
    
        if(store.getState().eventIhibitor!=true)
        {

            truePanel_falseButtonSet_handler(false)
            setTimeout(()=>{panelBtnChanger("", "logoDashReverse 1s forwards")}, 100)
            setTimeout(()=>{panelBtnChanger("", "")}, 1000)
        }
        
    }
  

render(){
    return (
        <>
        <img src={store.getState().whyUsImagesDisplayedOnAnimatiton.img} alt="Defensa Ciudadana" className={this.props.bootstrapClass}
        style={{width: store.getState().whyUsImagesDisplayedOnAnimatiton.zise, position: "absolute", left: store.getState().whyUsImagesDisplayedOnAnimatiton.left ,animation: store.getState().logoAnimation }} 
        onMouseOver={this.panelBtnChanger} onClick={this.onclickAnimationFunction}/>
        </>
        
    );

}

}

function mapStateToProps(state){

    return { frase: state.logoAnimation, whyUsImagesDisplayedOnAnimatiton: state.whyUsImagesDisplayedOnAnimatiton }

}

export default connect(mapStateToProps)(LogoGuide);