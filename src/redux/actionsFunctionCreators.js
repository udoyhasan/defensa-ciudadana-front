
export function changeVisibility(criteria1, criteria2) {/*FUNCION CREADORA DE ACCION 2*/
    return {
      type: "DISPLAY_INTRO",
      doneAction1: criteria1,
      doneAction2: criteria2      
    }
  }

  export function fetchData(criteria) {/*FUNCION CREADORA DE ACCION 2*/
    return {
      type: "INJECT_FETCHED_DATA",
      doneAction: criteria,
     
    }
  }

  export function changeBoolean(criteria) {/*FUNCION CREADORA DE ACCION 3*/
    return {
      type: "CHANGE_BOOLEAN",
      doneAction: criteria,
     
    }
  }

  export function showBubbleCreator(criteria) {/*FUNCION CREADORA DE ACCION 3*/
    return {
      type: "CHANGE_BOOBLE_VISIBILITY",
      doneAction: criteria,
     
    }
  }


