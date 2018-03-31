import { GET_DECKS } from "../actions/actions";

const inintialState = {};

export default (state = inintialState, action) => {
  switch (action.type) {
    case GET_DECKS: {
      return {...action.decks};
    }
    default: {
      return state;
    }
  }
};