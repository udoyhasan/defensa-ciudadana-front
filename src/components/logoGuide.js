import 'react-tippy/dist/tippy.css'; 
import {Tooltip} from 'react-tippy';
import React from 'react';
import logo from '../img/logo.png';
import textBubble from '../img/textBubble2.png';
import textBubble2 from '../img/textBubble3.png';
import imagen1 from '../img/dfPeople1.png';
import imagen2 from '../img/dfPeople2.png';
import imagen3 from '../img/dfPeople3.png';
import {panelBtnChanger} from '../redux/dispatchers.js';
import {backArrowAnimationDispatcher} from '../redux/dispatchers.js';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';
import {truePanel_falseButtonSet_handler} from '../redux/dispatchers.js';
import {eventInhibitorDispatcher} from '../redux/dispatchers.js';
import lottie from 'lottie-web';


export class LogoGuide extends React.Component{
    constructor(props){
        super(props);
        this.logoContainer = React.createRef();

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

    componentDidMount(){

        lottie.loadAnimation({
            container: this.logoContainer.current,
            render: 'svg',
            loop: false,
            autoplay: true,
            animationData: require('../img/Logo.json')
        })
    }

    panelBtnChanger(){
        if(store.getState().eventIhibitor==false)
        {
              panelBtnChanger("floatDown", "logoDash 1s forwards");
              backArrowAnimationDispatcher(" backArrow ");
              eventInhibitorDispatcher(true);
              
        }
    }


    onclickAnimationFunction(){
        
        if(store.getState().eventIhibitor==true)
        {      
            backArrowAnimationDispatcher(" backArrowReverse ");
            truePanel_falseButtonSet_handler(false)
            setTimeout(()=>{panelBtnChanger("", " logoDashReverse "); }, 100)
            setTimeout(()=>{panelBtnChanger("", ""); eventInhibitorDispatcher(false);}, 1000)
        }
        
    }  

    render(){
        return (
            <>
            <div style={{width: store.getState().whyUsImagesDisplayedOnAnimatiton.zise,position: store.getState().whyUsImagesDisplayedOnAnimatiton.position}} className={this.props.bootstrapClass + store.getState().logoAnimation} onMouseOver={(window.screen.width>=800)?this.panelBtnChanger:console.log(" ")} ref={this.logoContainer}>
            <i onClick={this.onclickAnimationFunction} className={'fas fa-angle-left mr-5 text-left ' + store.getState().backArrowAnimation} style={{zIndex: 5 , left: '30%', top: '10%', position: 'absolute', fontSize:'2vw'}}></i>
            </div>
            </>
            
        );

}

}

function mapStateToProps(state){

    return { frase: state.logoAnimation, whyUsImagesDisplayedOnAnimatiton: state.whyUsImagesDisplayedOnAnimatiton }

}

export default connect(mapStateToProps)(LogoGuide);