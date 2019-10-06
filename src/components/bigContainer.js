import React from 'react';
import SmallContainer from './smallContainer.js';





export default function BigContainer(props){
    return(
        <>
           <div className="container">
                <div className="row vh-100">
                <SmallContainer />
                <SmallContainer>            
                            {props.children}
                </SmallContainer>
               <SmallContainer />
                </div> 
            </div> 
        </>

    ) ;

}