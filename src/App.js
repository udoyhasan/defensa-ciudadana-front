import React from 'react';
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoGuide from './components/logoGuide.js'
import Container from './components/container';
import Button from './components/button.js';
import {store} from './redux/store.js';



export function App() {
  return (
    <> 
      <div className="row mt-5 mp-5">
      <div className="col-md-3"></div>
      <div className="col-md-3 d-flex justify-content-center "><LogoGuide bootstrapClass="mr-5 align-items-end mt-5 mp-5"/></div>
      <div className="col-md-4 mt-5 mp-5">
        <Container colOrRow="flex-column" >        
          <Button id="whyUs" btnLabel="Por qué confiar en Nosotros"/>
          <Button id="client" btnLabel="Soy Cliente"/>
          <Button id="advocate" btnLabel="Soy Defensor Ciudadano"/>
        </Container>
        </div>
      <div className="col-md-2"></div>
      </div>


    </>
  );
}
/* <Container colOrRow="flex-row">
        <LogoGuide bootstrapClass="mr-5 align-items-end "/>
        <Container colOrRow="flex-column">        
          <Button id="whyUs" btnLabel="Por qué confiar en Nosotros"/>
          <Button id="client" btnLabel="Soy Cliente"/>
          <Button id="advocate" btnLabel="Soy Defensor Ciudadano"/>
        </Container>
      </Container>*/


