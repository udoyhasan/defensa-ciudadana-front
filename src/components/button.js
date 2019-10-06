import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props){
    return(
        <>
           <button type="button" className="btn btn-secondary d-block mb-3 w-25">{props.btnLabel}</button>
        </>

    ) ;
 
} 


Button.propTypes = {
    btnLabel: PropTypes.string
  };