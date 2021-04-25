import React from 'react';

export default function Counter(props){
    let object =  props.object; // ATTRIBUTE EXAMPLE   {counter: 123, message: "ingresos"}

        return( 
           <>   
                <div className="container border">
                    <div className="jumbotron-fluid p-3 m-5" >
                        <div className="container w-50" style={{backgroundColor: "#32CB00"}}>
                            <h1 className="display-4 text-center text-light">{object.counter}</h1>
                            <p className="lead text-center text-light text-uppercase font-weight-bold p-3">{object.message}</p>
                        </div>
                    </div>
                </div>
           </> 

        );

}