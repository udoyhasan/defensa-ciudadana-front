import React, { useEffect, useState } from 'react';

export default function Counter(props){

    const [animationClass, setAnimationClass] = useState("");
    const [animationClassBoolean, setAnimationClassBoolean] = useState(false);
    const [invertClass, setInvertClass] = useState("");
    const [object, setObject] = useState({});

    useEffect(()=>{
        let passedObject = props.object
        setObject(passedObject)

    },[props])

        return( 
           <>   
                
                    <div onClick={()=>{ 
                        (!animationClassBoolean)?setAnimationClass("counterPerspectiveAnimation"):setAnimationClass("reverseCounterPerspectiveAnimation")
                        
                        setTimeout(()=> { 
                            if(animationClassBoolean){
                                setAnimationClassBoolean(false)
                                setInvertClass("invert")
                                setObject(props.object)
                            }else if(!animationClassBoolean){
                                
                                setInvertClass("reInvert")
                                setObject(props.reverseObject)
                                setAnimationClassBoolean(true)
                            }                          
                        },300);
                        }} className={`jumbotron-fluid p-3 m-5 ${animationClass} ${props.aditionalClassName}`} style={{backgroundColor: "#32CB00", cursor: "pointer", minHeight: "200px"}} >
                            <h1 className={`display-4 text-center text-light ${invertClass}`}>
                                {object.counter}
                            </h1>
                            <h5  className={`lead text-center text-light text-uppercase font-weight-bold p-3 ${invertClass}`}>
                                {object.message}
                            </h5>
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
*reverseObject:an object of data that will show when you click on counter and display other data. USe the same attributes than object propertie

*/