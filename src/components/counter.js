import React from 'react';

export default function Counter(props){
    let object =  props.object; // ATTRIBUTE EXAMPLE   {counter: 123, message: "ingresos"}

        return( 
           <>   
                <div class="container border">
                    <div class="jumbotron-fluid p-3 m-5" >
                        <div class="container" style={{backgroundColor: "#32CB00"}}>
                            <h1 class="display-4 text-center text-light">{object.counter}</h1>
                            <p class="lead text-center text-light text-uppercase font-weight-bold p-3">{object.message}</p>
                        </div>
                    </div>
                </div>
           </> 

        );

}