import React, {useState, useEffect} from 'react';



 export function HookdeEstado(){

    const [numero, setNum] = useState(1);

 return(<><h1>EL HOOK FUNCIONA {numero}</h1><button onClick={()=>{setNum(numero + 1)}}> aumentame hijo de puta</button></>);
    
} 

export function HookdeEfecto(){

    const [numero, setNum] = useState(1);

    useEffect(()=>{document.title = `funciona ${numero}`})

 return(<><h1  onClick={()=>{setNum(numero + 1)}} >EL HOOK FUNCIONA</h1></>);
    
} 