import React from 'react';
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoGuide from './components/logoGuide.js'
import BigContainer from './components/bigContainer';

function App() {
  return (
    <>
    <BigContainer>
      <LogoGuide />
      </BigContainer>
    </>
  );
}

export default App;
