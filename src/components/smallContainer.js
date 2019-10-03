import React from 'react';




export default function SmallContainer(props){
    return(
        <>
            <div className="col-md-4 vh-100"> {props.children}</div>
        </>

    ) ;

}