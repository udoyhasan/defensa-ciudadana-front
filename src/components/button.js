import React from 'react';
import PropTypes from 'prop-types';
import {injectFetchedData} from '../redux/dispatchers.js';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';




export class Button extends React.Component{
    constructor(props) {
        super(props);
        this.onclick = this.onclick.bind(this);
        this.fetchingData = this.fetchingData.bind(this);
      }

      onclick(event){

        switch(event.target.id){
                case 'whyUs':
                    console.log(event.target.id )
                break;

                case 'client':
                   console.log(event.target.id )
                   console.log(store.getState())
                 break;

                case 'advocate':
                    console.log(event.target.id )
                    this.fetchingData()
                    break;
        }
    }

    render(){
        
        return(
        <><code>{this.props.items}</code>
    <button id={this.props.id} type="button" onClick={this.onclick} className="btn btn-secondary d-block mb-3 w-25">{this.props.btnLabel}</button>
        </>

    ) ;}

    fetchingData(){
        fetch('https://hn.algolia.com/api/v1/search?query=redux')
        .then(response => response.json())
        .then(data => {injectFetchedData(data.hits[0].title); console.log(store.getState().fetchedData)})
        
    }

} 


Button.propTypes = {
    btnLabel: PropTypes.string
  };

  const mapStateToProps = (state) => {
      console.log("funciona msp")
    return { items: state.fetchedData };
  };

  export default connect(mapStateToProps)(Button);