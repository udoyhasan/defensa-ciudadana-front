import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';
import {injectFetchedData} from '../redux/dispatchers.js';
import {panelBtnChanger} from '../redux/dispatchers.js';
import {whyUsImagesDisplayedOnAnimatitonDispatcher} from '../redux/dispatchers.js';
import {truePanel_falseButtonSet_handler} from '../redux/dispatchers.js';
import {changeEndpoint} from '../redux/dispatchers.js';
import {eventInhibitorDispatcher} from '../redux/dispatchers.js';

import logo from '../img/logo.png';
import textBubble from '../img/textBubble2.png';
import textBubble2 from '../img/textBubble3.png';
import imagen1 from '../img/dfPeople1.png';
import imagen2 from '../img/dfPeople2.png';
import imagen3 from '../img/dfPeople3.png';

//COMPONENTE GENERAL DE TODOS LOS BOTONES
export class Button extends React.Component{
    constructor(props) {
        super(props);

        this.onclick = this.onclick.bind(this);
        
      }

      onclick(event){
        switch(event.target.id){//AUN NO SE HACE FETCH PERO SI SE VA CONSTRUYENDO LA URL PARA EL ENDPOINT
                case 'whyUs':
                    eventInhibitorDispatcher(true)
                    
                    
                    panelBtnChanger("floatUp 2s forwards", "logoDashReverse 1s forwards")
                    setTimeout(()=>{panelBtnChanger("", "whyUsRotation 10s forwards")}, 2000);
                    
                    setTimeout(()=>{ whyUsImagesDisplayedOnAnimatitonDispatcher({img: "/static/media/textBubble2.269b12d3.png", zise: "120%", left: "30%"});}, 2300);
                    setTimeout(()=>{ whyUsImagesDisplayedOnAnimatitonDispatcher({img: "/static/media/dfPeople1.64a6fe4a.png", zise: "120%", left: "30%"});}, 4150);
                    setTimeout(()=>{ whyUsImagesDisplayedOnAnimatitonDispatcher({img: "/static/media/dfPeople2.bfc81c8b.png", zise: "120%", left: "30%"});}, 4650);
                    setTimeout(()=>{ whyUsImagesDisplayedOnAnimatitonDispatcher({img: "/static/media/dfPeople3.876947f2.png", zise: "120%", left: "30%"});}, 5100);
                    setTimeout(()=>{ whyUsImagesDisplayedOnAnimatitonDispatcher({img: "/static/media/textBubble3.01004a76.png", zise: "120%", left: "30%"});}, 5600);
                    setTimeout(()=>{ whyUsImagesDisplayedOnAnimatitonDispatcher({img: "/static/media/logo.504cc4bb.png", zise: "80%", left: "50%"});}, 8300);
            
                    setTimeout(()=>{panelBtnChanger("", ""); eventInhibitorDispatcher(false)}, 8400);

                break;

                case 'client':
                    changeEndpoint("casos/")
                    panelBtnChanger("floatUp 2s forwards", "logoDash 1s forwards")
                    setTimeout(()=>{truePanel_falseButtonSet_handler(true)}, 900);
                 break;

                case 'advocate':
                    changeEndpoint("casos")
                    panelBtnChanger("floatUp 2s forwards", "logoDash 1s forwards")
                    setTimeout(()=>{truePanel_falseButtonSet_handler(true)}, 900);
                    break;
        }
    }

    render(){
        
        return(
        <>
    <button id={this.props.id} type="button" onClick={this.onclick}
    className="btn btn-secondary d-block mb-3 w-100" style={{width: "60%"}}>
        {this.props.btnLabel}
        </button>
        </>

    ) ;}

    

} 


Button.propTypes = {
    btnLabel: PropTypes.string
  };

  const mapStateToProps = (state) => {
    return { items: state.fetchedData, visibilityStyle: state.showBubble };
  };

  export default connect(mapStateToProps)(Button);