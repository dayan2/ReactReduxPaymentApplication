import { SAVE_CARD } from "../constants/index";

const initialState = {
  cardDetails: {}
};

function rootReducer(state = initialState, action) {
  
  switch (action.type) {
    case SAVE_CARD:
      return { ...state, cardDetails: action.payload };
    default:
      return state;
  }
}
export default rootReducer;