import React, { useEffect, useState } from 'react';
import LottieContainer from '../components/lottieContainer.js'
import Input from '../components/input.js'


export default function Login(props){

        const [userInputValue, setUserInputValue] = useState("")
        const [passwordInputValue, setPasswordInputValue] = useState("")

        const handleCallbackUserInput = (childData) =>{
                setUserInputValue(childData)
            }
        const handleCallbackPasswordInput = (childData) =>{

                setPasswordInputValue(setPasswordInputValue)
        }
             return( 
           <>  
           <div className="container pt-5 mt-5">
                <LottieContainer lottie="20860-person-on-laptop-working-on-laptop" width="40%" />   
                <Input customtype="rut" parentCallback = {handleCallbackUserInput} type="text" displayBtn="none" sorryMsg="su usuario no esta autorizado para ingresar" placeholder="00.000.000-0" />
                <Input parentCallback = {handleCallbackPasswordInput} userValue={userInputValue} type="password" displayBtn="inline" btnLabel="Ingresar" sorryMsg="su usuario no esta autorizado para ingresar" placeholder="clave" endpoint="lawyers/"/>
           </div>
           </> 

        );

}