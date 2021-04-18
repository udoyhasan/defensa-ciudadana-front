import React from 'react';
import './style/App.css';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {store} from './redux/store.js';
import { connect } from 'react-redux';
import LogoGuide from './clientView/logoGuide.js'
import Container from './clientView/container';
import Button from './clientView/button.js';
import Input from './clientView/input.js';
import {whatCaseWasClickedFunction} from './redux/dispatchers.js';
import lottie from 'lottie-web';


//CONSTANTES QUE AFECTAN AL COMPONENTE
const buttonSet= (<Container colOrRow="" >        
  <Button id="whyUs" cursor="not-allowed" btnLabel="¿Es Chile Justo?"/>
  <Button id="client" btnLabel="Clientes"/>
  <Link to='/login' className='text-white text-decoration-none'><button id="advocate" type="button" className="btn btn-secondary d-block mb-3 w-100" style={{width: "60%", cursor: "pointer"}}>Soy Defensor Ciudadano</button></Link>
  
</Container>);

//COMPONENTE
export class App extends React.Component {
  constructor(props){
  super(props); 
  this.loader = React.createRef();
  this.myRef = React.createRef();
  this.turnVerticalAdvisor = React.createRef();
  this.lawyerOnBike = React.createRef();
  this.player = React.createRef();

  this.handleClick = this.handleClick.bind(this);
  
  
  }
  
  handleClick(event) {

    let data = event.target.value;
    whatCaseWasClickedFunction(data);
  }
  componentDidMount(){ 

  //WE CLEAR THE LOCALSTORAGE IN CASE THE USER TURN BACK FROM THE CLIENT PANEL
  localStorage.clear();
  // GET CURRENT DATE FOR LOTTIE FILE DISPLAY
  let today = new Date();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let lottieFile;
 
  if(month==9){
    lottieFile = "september18";
  }
  else if(month == 12 && day >= 26 || month==1 && day<6){
    lottieFile = "newYear";
  }
  else{lottieFile = "lawyerOnBike";}


    //this.player.current.play()
    //setTimeout(()=>{this.player.current.pause()}, 7000)
//LOTTIE FILES ANIMATIONS
    lottie.loadAnimation({
      container: this.loader.current,
      render: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./assets/17037-loaders-volume-3.json')
  })

  lottie.loadAnimation({
    container: this.turnVerticalAdvisor.current,
    render: 'svg',
    loop: true,
    autoplay: true,
    animationData: require('./assets/11330-rotate-phone.json')
  })
  setTimeout(()=> {
  lottie.loadAnimation({
    container: this.lawyerOnBike.current,
    render: 'svg',
    loop: true,
    autoplay: true,
    animationData: require(`./assets/${lottieFile}.json`)
  })
    this.lawyerOnBike.current.className += " opacityPopUpLottieAnimationIntro "
}, 2200)

  

    console.warn = function() {}// SE DESABILITARON TODOS LOS CONSOLE.WARN()
    console.log("%cDefensa Ciudadana©" , "color: green; font-weight: bold; font-size:18px; font-family:Comic Sans MS")
    console.log("%cDerechos de autor, marca y código fuente ", "color: gray; font-weight: bold; font-size:12px; font-family:Courier New")
    console.log("%cde propiedad de Guillermo Piedrabuena Parrochía", "color: gray; font-weight: bold; font-size:12px; font-family:Courier New")
    localStorage.removeItem("savedEle")
   
    
}

  render(){
    return (
      <> 
      

      <div className={"container-fluid pt-5" + this.props.appContainerClassModifierToPreventSamsungGalaxyKeyboardError[0]}>
        <div className="row">
          <div className="col-2 col-sm-2 col-md-2 col-lg-4 col-xl-4 " ><audio /*src={introSound}*/  ref={this.player} autoPlay/></div>
          <div className="col-8 col-sm-8 col-md-8 col-lg-4 col-xl-4">  
          <div  ref={this.turnVerticalAdvisor} className={this.props.appContainerClassModifierToPreventSamsungGalaxyKeyboardError[1]} style={{paddingBottom: "30%", transform: "rotate(90deg)", height: "70vh", width: "40vw" ,zIndex: '9', position: 'absolute', backgroundColor: "#1FBF2A"}}></div>
          <LogoGuide bootstrapClass="pt-5 text-center align-items-end center-block "/>{/*dejar espacio al final del class*/}
          {(this.props.boolean)? <div>
                                  <Input > 
                                    <div ref={this.myRef} className="d-flex  mt-2 flex-column " style={{width: "100%", height: "260px", overflow: "auto", zIndex: "2" }}>
                                      <h1 className="badge badge-secondary pt-2 pb-2" style={{fontSize: "100%", backgroundColor: "white", color: "black"}}>
                                        {store.getState().fetchedData.resp.map((item, index)=>{return <Link key={index} to="/clientPanel" style={{textDecoration: "none"}}><button className="btn btn-secondary d-block mb-3 w-100" style={{width: "60%"}} key={index} onClick={this.handleClick} value={(item.cases_rol_rit_ruc=='-sin rol-')?item.cases_id:item.cases_rol_rit_ruc}>{(item.cases_rol_rit_ruc=='-sin rol-')?`rol transitorio N°${item.cases_id}`:item.cases_rol_rit_ruc} {item.cases_legalIssue}</button></Link>})}                 
                                      </h1>
                                    </div>
                                    </Input>

                                  </div>

                  : buttonSet}                                  
                  <div id="lottie-file-loader" className={this.props.showLoader} ref={this.loader}></div>

          </div>
          <div className="col-2 col-sm-2 col-md-2 col-lg-4 col-xl-4" >
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-0 m-0" style={{zIndex: "-3" , position: "absolute", bottom: "0px", width: "120vw"}}>
          <div ref={this.lawyerOnBike}></div>
          </div>
        </div>
      </div>        
      </>
    );
  }
}

function mapStateToProps(state){

  return {appContainerClassModifierToPreventSamsungGalaxyKeyboardError: state.appContainerClassModifierToPreventSamsungGalaxyKeyboardError , showLoader: state.showLoader, boolean: state.truePanel_falseButtonBoolean, fetchedData: state.fetchedData, show: state.show }

}

export default connect(mapStateToProps)(App);

