import React from 'react';
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {store} from './redux/store.js';
import { connect } from 'react-redux';
import LogoGuide from './components/logoGuide.js'
import Container from './components/container';
import Button from './components/button.js';
import Input from './components/input.js';



const buttonSet= (<Container colOrRow="flex-column" >        
  <Button id="whyUs" btnLabel="Por qué confiar en Nosotros"/>
  <Button id="client" btnLabel="Soy Cliente"/>
  <Button id="advocate" btnLabel="Soy Defensor Ciudadano"/>
</Container>);

const panel=(            
<div className="d-flex justify-content-center mt-5 pt-5 flex-column " style={{position: "absolute"}}>{store.getState().fetchedData[0]}</div>);

export class App extends React.Component {
  constructor(props){
  super(props)
  }
  render(){
    return (
      <> 
        <div className="row mt-5 mp-5">
          <div className="col-md-3"></div>
          <div className="col-md-3 d-flex justify-content-center ">
            <LogoGuide bootstrapClass="mr-5 align-items-end mt-5 mp-5"/>
          </div>
          <div className="col-md-4 mt-5 mp-5">
            {(this.props.boolean)? <div className="d-flex justify-content-center mt-5 pt-5 flex-column " style={{position: "absolute"}}><Input />{store.getState().fetchedData.map((item)=>{return(<h2 className="badge badge-secondary">{item}</h2>)})}</div>: buttonSet}
          </div>
          <div className="col-md-2"></div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state){

  return { boolean: state.truePanel_falseButtonBoolean, fetchedData: state.fetchedData, show: state.show }

}

export default connect(mapStateToProps)(App);

