import {
    INIT ,
    ADD_ALLERGY,
    UPDATE_ALLERGY
  } from "../actions/actionTypes" ; //No I18N
  
  const initState = {
    allergies : [] ,
    status : INIT 
  } ;
  
  function AllergyReducer(state = initState , action) {
  
    switch (action.type) {
  
      case ADD_ALLERGY:
        return { allergies: [...state.allergies , action.payload] , status : ADD_ALLERGY };

      case UPDATE_ALLERGY:
          const index = action.payload.index ;
          return { 
            allergies: [ ...state.allergies.slice(0,index) ,  ...action.payload.data , ...state.allergies.slice(index + 1)] ,
            status : UPDATE_ALLERGY 
          };
    
      case INIT:
        return { allergies : state.allergies , status : INIT };
  
      default:
        return state;
    }
  };
  
  export default AllergyReducer;