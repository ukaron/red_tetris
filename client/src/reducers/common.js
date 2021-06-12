import { LOG_IN, LOG_OUT } from "../constants/actions/common";

const initialState = {
    name: '',
}

export const user = (state= initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {...state, name: action.payload};
        case LOG_OUT:
            return {...state, name: ''};     
        default:
            return state;
  }
}

export default user;
