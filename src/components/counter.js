import React from 'react';

export default function Counter(props){
    let object =  props.object; // ATTRIBUTE EXAMPLE   {counter: 123, message: "ingresos"}

        return( 
           <>   
                
                    <div className={`jumbotron-fluid p-3 m-5 ${props.aditionalClassName}`} style={{backgroundColor: "#32CB00"}} >
                            <h1 className="display-4 text-center text-light">
                                {object.counter}
                            </h1>
                            <p className="lead text-center text-light text-uppercase font-weight-bold p-3">
                                {object.message}
                            </p>
                    </div>
 
           </> 

        );

}

/*

readMe

#Props brief:

*aditionalClassName: if you want to add an aditional class, like bootstrap grid system class or another
*object: an object of data that you have to pass with this attributes:
    -counter
    -messages

Example: {counter: this.state.statisticsActiveCases, message: "Casos Activos"}

*/