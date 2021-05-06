import React from 'react';

export default function Button(props){

        return( 
           <>   
             <button id={props.id} onClick={props.onClickFunction} type="button" className={`btn btn-secondary d-block mb-3 w-100 ${props.aditionalClassName}`} style={{width: "60%", cursor: "pointer"}}>{props.children}</button>

           </> 

        );

}

/*readMe

#Props brief:

*id
*onClickFunction
*aditionalClassName
*To add a btn label, you have only pass the text as a child element
*/