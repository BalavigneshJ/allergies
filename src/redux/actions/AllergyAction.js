import { ADD_ALLERGY , UPDATE_ALLERGY  } from "./actionTypes"; 

export const save = (type,content) => ({
  type: type,
  payload : content
});


export const updateAllergy = (data,index) => {
  return (dispatch) => {
    dispatch(save(UPDATE_ALLERGY , {data:data , index:index})) ;
  }
};


export const createAllergy = (data) => {
  return (dispatch) => {
    dispatch(save(ADD_ALLERGY ,data))
  }
};


  
  
  
  