import React from 'react';
import PropTypes from 'prop-types';


export default class Button extends React.Component{
    constructor(props) {
        super(props);
        this.onclick = this.onclick.bind(this);
      }
      onclick(event){

        switch(event.target.id){
                case 'whyUs':
                    console.log(event.target.id )
                break;

                case 'client':
                   console.log(event.target.id )
                 break;

                case 'advocate':
                    console.log(event.target.id )
                    break;
        }
    }

    render(){
        return(
        <>
           <button id={this.props.id} type="button" onClick={this.onclick} className="btn btn-secondary d-block mb-3 w-25">{this.props.btnLabel}</button>
        </>

    ) ;}

  
 
} 


Button.propTypes = {
    btnLabel: PropTypes.string
  };