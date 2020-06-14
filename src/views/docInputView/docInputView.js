import React from 'react';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';


//COMPONENTE
export default class docInputView extends React.Component {
  constructor(props){
  super(props)

  
  }
  
  render(){
    return (
      <> 
       <form name="search" action="C:/Users/gnpie/OneDrive/Escritorio/proyectos/pythonDF/docProcessor.py" method="post" enctype="multipart/form-data">
        
        <input type="file" name="archivo1"/> {/*atributo name hace que se guarde el archivo con el string que pongo a atributo */}
        <input type="submit" value="Upload Image" name="submit"/>
       </form> 
      </>
    );
  }
}


