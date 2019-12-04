import React from 'react';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';




export class Container extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
  return(  <>
            <div className={"d-flex justify-content-center mt-5 pt-5 "+ this.props.colOrRow} style={{visibility: "hidden", animation: store.getState().show, position: "absolute"}}> {/* colOrRow permite poner el contenedor flex vertical o horizontal */}
            {this.props.children}{/* el problema es que el container tiene animation y se resetea al serr panel*/}
            </div>
            </>    
    
  );
  }
}

const mapStateToProps = (state) => {
    return { items: state.fetchedData, items2: state.show };
  };
  
  export default connect(mapStateToProps)(Container);