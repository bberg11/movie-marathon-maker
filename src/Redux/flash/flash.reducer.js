import flashActionTypes from 'Redux/flash/flash.types';

export const INITIAL_STATE = {
  messages: [],
};

const flashReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case flashActionTypes.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case flashActionTypes.REMOVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(
          (message, index) => index !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default flashReducer;
