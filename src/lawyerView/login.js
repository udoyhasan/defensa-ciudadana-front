import React, { useEffect, useState } from 'react';
import LottieContainer from '../components/lottieContainer.js'
import Input from '../components/input.js'
import {store} from '../redux/store.js';
import { useHistory } from "react-router-dom";


export default function Login(props){

        const [userInputValue, setUserInputValue] = useState("")
        const [passwordInputValue, setPasswordInputValue] = useState("")
        let history = useHistory();

        useEffect(()=>{
               let lawyerUser = JSON.parse(localStorage.getItem("lawyerData"));
               let lawyerUserOBJ;

               if (lawyerUser !== null){ 
                        lawyerUserOBJ = JsonToJSObjectConversor(lawyerUser)
                        fetch(store.getState().fetchBase + "lawyers/" + lawyerUserOBJ.user)
                        .then( (resp)=>{ return resp.json();})
                        .then((data)=>{ 
                                
                        if(data.resp === lawyerUserOBJ.password){
                                history.push("/rFgTdSvSVFgVFrtvvVgVSFvGDVDFVfgBfhGBgdVdFDVV");   
                        }
                        })
                        .catch((error)=>{console.log(error)})
                }  
        },[])

        const handleCallbackUserInput = (childData) =>{
                setUserInputValue(childData)
            }
        const handleCallbackPasswordInput = (childData) =>{

                setPasswordInputValue(setPasswordInputValue)
        }

        const JsonToJSObjectConversor = (json) => {

                let passwordStartIndex = json.indexOf('"password":"') + 12; 
                let passwordEndIndex = json.indexOf('","lawyerUser":'); 
                let password = json.substring(passwordStartIndex, passwordEndIndex);

                let userStartIndex = passwordEndIndex + 16;
                let userEndIndex = json.indexOf('"}');
                let user = json.substring(userStartIndex, userEndIndex);

                return {user: user, password: password};
        }
        
        return( 
           <>  
           <div className="container p-5 mt-5">
                <LottieContainer play={true} name="loginAnimation" lottie="20860-person-on-laptop-working-on-laptop" width={(window.screen.width<500)?"100%":"40%"}/>   
                <Input includeLoader={false} customtype="rut" parentCallback = {handleCallbackUserInput} type="text" displayBtn="none" sorryMsg="su usuario no esta autorizado para ingresar" placeholder="00.000.000-0" />
                <Input includeLoader={true} parentCallback = {handleCallbackPasswordInput} userValue={userInputValue} type="password" displayBtn="inline" btnLabel="Ingresar" sorryMsg="su usuario o no existe o no esta autorizado para ingresar" placeholder="clave" endpoint="lawyers/"/>
           </div>
           </> 

        );
}