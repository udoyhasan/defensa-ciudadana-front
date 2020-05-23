fetch(store.getState().fetchBase + "casos/detalle/" + `${arrOfCaseIdAndClientID[1]}/${arrOfCaseIdAndClientID[0]}`)
.then(response => {return response.json();})
.then(data => { 


injectFetchedData(data);

let date = store.getState().fetchedData.resp[0][12];//SE TRANSFORMA A FECHA CORTA
date = date.slice(date.indexOf(',')+1)
// ENCUENTRA TERCER ESPACIO Y SACA HORAS Y MINUTOS
let dateArr = date.split('')
let thirdSpaceIndex= 0
let iterator=0;
dateArr.forEach((item, index)=>{
  if(item===' '){
    iterator++;
    if(iterator==4){
    thirdSpaceIndex= index;
    }
  }
})
date = date.slice(0, thirdSpaceIndex)

/*this.setState({
  case: store.getState().fetchedData.resp[0][1],
  client: store.getState().fetchedData.resp[0][14],
  update: store.getState().fetchedData.resp[0][7],
  updateDate: date,
  objetive: store.getState().fetchedData.resp[0][8],
  rol: store.getState().fetchedData.resp[0][2],
  trial: store.getState().fetchedData.resp[0][3],
  subject: store.getState().fetchedData.resp[0][4],
  procedure: store.getState().fetchedData.resp[0][5],
  estadoCivil: store.getState().fetchedData.resp[0][13],
  nacionalidad: store.getState().fetchedData.resp[0][12],
  clientId: store.getState().fetchedData.resp[0][6],
  casoId: store.getState().fetchedData.resp[0][0]
});*/


//SE OBTIENE LA LISTA DE DOCUMENTOS ASOCIADOS AL CASO
let objUrl = null;
fetch(store.getState().fetchBase + "getDocument_id_list/" + this.state.casoId)
.then(response => {return response.json();})
.then(data => {
        
    this.setState({documents_id_arr: data.resp.documents_list})//SE GUARDA LA LISTA DE DOCUMENTOS (PROVENIENTES DEL FETCH) EN EL STATE DEL COMPONENTE
   
    this.state.documents_id_arr.forEach((item)=>{
      fetch(store.getState().fetchBase + "getFiles/" + item[0])
      .then(response => {return response.blob();})//SE RECIBE EL PDF COMO BLOB
      .then(blob =>{

      objUrl = URL.createObjectURL(blob)

      let node = document.createElement("A"); 
      node.setAttribute("class", "list-group-item list-group-item-action") 

      let download = `${item[1]}.pdf`              

      let rutSaver = store.getState().rutSaver; // DFPASS
      let arrRutSaver = rutSaver.split('')
      let dfpass = arrRutSaver.slice(7 , 10)
      dfpass =dfpass.join('')              

      this.dfPass.current.addEventListener("mouseover", (e)=>{
            
        setTimeout(()=>{
          
          let tipyExpanded = e.target.getAttribute("aria-expanded")
            if(tipyExpanded){//SE DETECTA QUE EL TOOLTIP APARECIÓ

              let elements = document.getElementsByClassName('tipy')

                  for (var i = 0; i < elements.length; i++) {
                   
                    let elementValue = elements[i].value;
                    
                    elements[i].addEventListener('keypress', function(e) {
                      
                      if(e.key=="Enter"){
                    
                        console.log(elementValue)
                        if(elementValue===dfpass){
                          node.setAttribute("href", objUrl)
                          node.download = `${item[1]}.pdf`;
                        }
                      }

                  });
                }
            
            }
        },500)
        
          
      })
      let textnode =  document.createTextNode(item[1]); 
      node.appendChild(textnode);              
      
      nodeArr.push({index: item[0], node: node})// SE ORDENAN LOS DOCUMENTOS DE ACUERDO AL ID (FECHA INGRESO)
      nodeArr.sort((a,b)=>a.index-b.index);
      nodeArr.forEach((item)=>{
        this.documentListContainer.current.appendChild(item.node);
      })

      

      tippy('.password', {
        content: `<input class="tipy" type="text" className="form-control" placeholder="INGRESA DFPASS"/>`,
        allowHTML: true,
        interactive: true,
        theme: 'tomato',
        placement: 'left',
        theme: ""/*color pero no se pone*/,
        trigger: 'mouseenter click',
        hideOnClick: false,

      });

      

      })
    })
})

})