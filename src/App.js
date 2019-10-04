import React from 'react';
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoGuide from './components/logoGuide.js'
import BigContainer from './components/bigContainer';
import Button from './components/button';

function App() {
  return (
    <>
    <BigContainer>
      <LogoGuide />
    </BigContainer>
    <Button btnLabel="Soy Cliente" />
    <Button btnLabel="Soy Defensor Ciudadano" />
    <Button btnLabel="Porqué Confiar en Nosotros" />
    </>
  );
}

export default App;
