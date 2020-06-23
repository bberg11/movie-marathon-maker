import flashActionTypes from 'Redux/flash/flash.types';

export const addMessage = (message, type) => {
  return {
    type: flashActionTypes.ADD_MESSAGE,
    payload: { message, type },
  };
};

export const removeMessage = (index) => {
  return {
    type: flashActionTypes.REMOVE_MESSAGE,
    payload: index,
  };
};
