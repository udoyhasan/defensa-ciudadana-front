import 'react-tippy/dist/tippy.css'; 
import React from 'react';
import logo from '../assets/logo.png';
import instagramLogo from '../assets/instagram.png';
import facebookLogo from '../assets/facebook.png';
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
            animationData: require('../assets/Logo.json')
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
            
            if(store.getState().inputIsDisplayed==true){
                panelBtnChanger("d-none", " logoDashReverse ")
            }
            else{
                setTimeout(()=>{panelBtnChanger(" floatUp ", " logoDashReverse ")}, 100)
            } 
            truePanel_falseButtonSet_handler(false);
            

            
            setTimeout(()=>{panelBtnChanger("", ""); eventInhibitorDispatcher(false);}, 1000)
        }
        
    }  

    render(){
        return (
            <>
            <div style={{width: store.getState().whyUsImagesDisplayedOnAnimatiton.zise,position: store.getState().whyUsImagesDisplayedOnAnimatiton.position}} className={this.props.bootstrapClass + store.getState().logoAnimation} onClick={(window.screen.width<=800)?this.panelBtnChanger:console.log(" ")} onMouseOver={(window.screen.width>=800)?this.panelBtnChanger:console.log(" ")} ref={this.logoContainer}>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                            <i onClick={this.onclickAnimationFunction} className={'pt-4 fas fa-angle-left text-left ' + store.getState().backArrowAnimation} style={{ zIndex: 5 , position: 'absolute', fontSize:'2vw'}}></i>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <a style={{zIndex: "5"}} className={"ml-3 position-absolute "+ store.getState().backArrowAnimation} href="https://www.instagram.com/defensorciudadanacl/"><img className="social-media" src={instagramLogo} /></a>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <a style={{zIndex: "5"}} className={" position-absolute " + store.getState().backArrowAnimation} href="https://www.facebook.com/Defensor-Ciudadana-102004724631467"><img className="social-media" src={facebookLogo}/></a>
                        </div>
                    </div>
                </div>
            </div>
            </>
            
        );

}

}

function mapStateToProps(state){

    return { frase: state.logoAnimation, whyUsImagesDisplayedOnAnimatiton: state.whyUsImagesDisplayedOnAnimatiton }

}

export default connect(mapStateToProps)(LogoGuide);