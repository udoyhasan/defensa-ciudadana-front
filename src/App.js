import React from 'react';
import './style/App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {store} from './redux/store.js';
import { connect } from 'react-redux';
import LogoGuide from './components/logoGuide.js'
import Container from './components/container';
import Button from './components/button.js';
import Input from './components/input.js';


//CONSTANTES QUE AFECTAN AL COMPONENTE
const buttonSet= (<Container colOrRow="flex-column" >        
  <Button id="whyUs" btnLabel="Por qué confiar en Nosotros"/>
  <Button id="client" btnLabel="Soy Cliente"/>
  <Button id="advocate" btnLabel="Soy Defensor Ciudadano"/>
</Container>);

const panel=(            
<div className="d-flex mt-5 pt-5 flex-column " style={{position: "absolute"}}>{store.getState().fetchedData[0]}</div>);

//COMPONENTE
export class App extends React.Component {
  constructor(props){
  super(props)
  
  }
  
  /*fetchingData(){
  injectFetchedData("casos/detalle/")
    fetch(store.getState().fetchBase + "casos/detalle/" + "'posesion_efectiva'  ")
       .then(response => {return response.json();})
       .then(data => {injectFetchedData(data);console.log(store.getState().fetchedData.resp[0][1])})
  }*/

  render(){
    return (
      <> 
        <div className="row mt-5 mp-5">
          <div className="col-md-3"></div>
          <div className="col-md-3 d-flex  ">
            <LogoGuide bootstrapClass="mr-5 align-items-end mt-5 mp-5"/>
          </div>
          <div className="col-md-4 mt-5 mp-5">
          {(this.props.boolean)? <div>
                            <Input />
                              <div className="d-flex  mt-2 flex-column " style={{width: "100%", height: "310px", overflow: "auto"}}>
                                <h1 className="badge badge-secondary pt-2 pb-2" style={{fontSize: "100%", backgroundColor: "white", color: "black"}}>
                                  {store.getState().fetchedData.resp.map((item, index)=>{return <Link to="/clientPanel" style={{textDecoration: "none"}}><button className="btn btn-secondary d-block mb-3 w-100" style={{width: "60%"}} key={index} /*onClick={this.fetchingData}*/>{item[0]}</button></Link>})}                 
                                </h1>
                              </div>
                            </div>
            : buttonSet}
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

