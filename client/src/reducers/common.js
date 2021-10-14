import { LOG_IN, LOG_OUT } from "../constants/actions/common";

const initialState = {
    name: '',
    socket: {},
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return action.payload;
        case LOG_OUT:
            return initialState;     
        default:
            return state;
  }
}

export default user;
