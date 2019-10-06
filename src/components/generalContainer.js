import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {store} from '../redux/store.js'

export class GeneralContainer extends React.Component{
    render(){
        return(
        <>
        <div className="container" style={{visibility: "hidden", animation: store.getState().show, position: this.props.position, left: this.props.left, bottom: this.props.bottom}}>
        {this.props.children}
        </div>
        </>

    ) ;}
 
} 

function mapStateToProps(state){

    return { frase: state.show}

}
 
export default connect(mapStateToProps)(GeneralContainer);

GeneralContainer.propTypes = {
    btnLabel: PropTypes.string,
    position:  PropTypes.string,
    left: PropTypes.string,
    bottom: PropTypes.string,
    visibility: PropTypes.string
  };