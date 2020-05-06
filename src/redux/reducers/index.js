import { combineReducers } from 'redux';
import AllergyReducer from "./AllergyReducer" ;



const rootReducer = combineReducers({
  Allergies : AllergyReducer
});

export default rootReducer;
