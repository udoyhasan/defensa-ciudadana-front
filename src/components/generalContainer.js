import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {store} from '../redux/store.js'

export function GeneralContainer(props){
    return(
        <>
        <div className="container" style={{visibility: store.getState().show, position: props.position, left: props.left, bottom: props.bottom}}>
        {props.children}
        </div>
        </>

    ) ;
 
} 

function mapStateToProps(state){

    return { frase: state.show}

}
 
export default connect(mapStateToProps)(GeneralContainer);

GeneralContainer.propTypes = {
    btnLabel: PropTypes.string,
    position:  PropTypes.string,
    left: PropTypes.string,
    bottom: PropTypes.string
  };