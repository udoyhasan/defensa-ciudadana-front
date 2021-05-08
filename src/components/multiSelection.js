import React from 'react';

export default function MultiSelection(props){

        return( 
           <>   

                <input list={props.boundary} name="browser" id={props.id} ref={props.reference}/>
                <datalist  id={props.boundary}  style={{width: "100%", borderColor: "#4DF79F"}} placeholder='tipo documento'>
                    {
                       props.options.map((item)=>{ 

                            return <option value={item}>{item}</option>

                       }) 
                    }
                
                </datalist >

 
           </> 

        );

}

/*

readMe

#Props brief:

*id: a ref for the element
*options: pass an array to create multiples option tags
*boundary: the identificator to bound input with options
    
*/


