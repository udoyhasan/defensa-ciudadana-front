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
import { connect } from 'react-redux';
import {store} from '../redux/store.js';
import {truePanel_falseButtonSet_handler} from '../redux/dispatchers.js';
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
            animationData: require('../img/logo.json')
        })
    }

    panelBtnChanger(){
        if(store.getState().eventIhibitor!=true)
        {
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
            {/*<Tooltip
            title="Welcome to React"
            position="bottom"
            trigger="mouseenter"
            placement="right-end"
            >*/}
            <div style={{width: store.getState().whyUsImagesDisplayedOnAnimatiton.zise, position: "absolute", left: store.getState().whyUsImagesDisplayedOnAnimatiton.left ,animation: store.getState().logoAnimation }} className={this.props.bootstrapClass} onMouseOver={this.panelBtnChanger} onClick={this.onclickAnimationFunction} ref={this.logoContainer}>

            </div>
            {/*<img src={store.getState().whyUsImagesDisplayedOnAnimatiton.img} alt="Defensa Ciudadana" className={this.props.bootstrapClass}
            style={{width: store.getState().whyUsImagesDisplayedOnAnimatiton.zise, position: "absolute", left: store.getState().whyUsImagesDisplayedOnAnimatiton.left ,animation: store.getState().logoAnimation }} 
        onMouseOver={this.panelBtnChanger} onClick={this.onclickAnimationFunction}/>*/}
            {/*</Tooltip>*/}
            </>
            
        );

}

}

function mapStateToProps(state){

    return { frase: state.logoAnimation, whyUsImagesDisplayedOnAnimatiton: state.whyUsImagesDisplayedOnAnimatiton }

}

export default connect(mapStateToProps)(LogoGuide);