import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//COMPONENTE GENERAL DE TODOS LOS BOTONES
export class Button extends React.Component{

    render(){
        
        return(
        <>
        <button id={this.props.id} type="button" onClick={this.props.onClickFunction}//this.onclick}
            className="btn btn-secondary d-block mb-3 w-100" style={{width: "60%", cursor: this.props.cursor}}>
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

  /*

readMe

#Props brief:

*For insert a Button label don't set a props, only insert text between an open and close tag
*id
*cursor: the css cursor's style
*onClickFunction
*/