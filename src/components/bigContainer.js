import React from 'react';
import SmallContainer from './smallContainer.js';


export class BigContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {data: this.props.frase}
    }

    render(){ return(
        <>dscsdcds
           <div className="container">
                <div className="row vh-100">
                <SmallContainer />
                <SmallContainer>            
                            {this.props.children}
                </SmallContainer>
               <SmallContainer />
                </div> 
            </div> 
        </>

    ) ;}

}

