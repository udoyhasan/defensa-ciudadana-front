import React from 'react';
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoGuide from './components/logoGuide.js'
import BigContainer from './components/bigContainer';
import Button from './components/button.js';
import GeneralContainer from './components/generalContainer'


function App() {
  return (
    <>
    <BigContainer>
      <LogoGuide />
    </BigContainer>
    <GeneralContainer position="absolute" left="45%" bottom="42%">
    <Button btnLabel="Porqué confiar en Nosotros"/>
    <Button btnLabel="Soy Cliente"/>
    <Button btnLabel="Soy Defensor Ciudadano"/>
    </GeneralContainer>
    </>
  );
}

export default App;
