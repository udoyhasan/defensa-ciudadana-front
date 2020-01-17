import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';
import {injectFetchedData} from '../redux/dispatchers.js';
import {panelBtnChanger} from '../redux/dispatchers.js';
import {truePanel_falseButtonSet_handler} from '../redux/dispatchers.js';
import {showBubble} from '../redux/dispatchers.js';
import {changeEndpoint} from '../redux/dispatchers.js';

//COMPONENTE GENERAL DE TODOS LOS BOTONES
export class Button extends React.Component{
    constructor(props) {
        super(props);
        this.onclick = this.onclick.bind(this);
        
      }

      onclick(event){
        switch(event.target.id){//AUN NO SE HACE FETCH PERO SI SE VA CONSTRUYENDO LA URL PARA EL ENDPOINT
                case 'whyUs':
                    setTimeout(()=>{showBubble("visible")},500);
                    panelBtnChanger("floatUp 2s forwards", "logoDash 1s forwards")
                    setTimeout(()=>{panelBtnChanger("", "logoDashReverse 1s forwards");}, 700);
                    
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