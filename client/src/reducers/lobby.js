import { JOIN_LOBBY, LEAVE_LOBBY, START_GAME } from "../constants/actions/common";

const initialState = {
    id: '',
    lobby_name: '',
    users: [],
    isActive: false,
};

export const user = (state= initialState, action) => {
  switch (action.type) {
    case JOIN_LOBBY:
        return { ...state, users: users.push(action.payload) };
    case LEAVE_LOBBY:
        return { ...state, users: users.filter(user => user === action.payload) };
    case START_GAME:
        return { ...state, isActive: true };
    default:
        return state;
  };
};

export default user;
