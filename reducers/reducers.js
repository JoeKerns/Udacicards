import { combineReducers } from 'redux';
import { GET_DECKS, SAVE_QUESTION, SAVE_DECK, QUESTION_LOG, RESET_QUIZ } from "../actions/actions";

function decks (state = {}, action) {
  switch (action.type) {
    case GET_DECKS: {
      return {
        ...state,
        ...action.decks,
      };
    }

    case SAVE_QUESTION: {
      let newState = {...state};
      newState[action.deckTitle].questions.push(action.qanda);
      return newState;
    }

    case SAVE_DECK: {
      return {
        ...state,
        ...action.newDeck
      }
    }

    default: {
      return state;
    }
  }
};

const initialQuizState = { correct: 0, qIndex: 0 }

function quizzes ( state = initialQuizState, action) {
  switch (action.type) {
    case QUESTION_LOG: {
      state.qIndex += 1;
      state.correct = action.result === 'correct' ? state.correct + 1 : state.correct;
      console.log('quiz reducer',state);
      return {
        ...state
      }
    }

    case RESET_QUIZ: {
      const resetState = { correct: 0, qIndex: 0 }
      return { ...resetState };
    }

    default: {
      return state;
    }      
  }
}

const rootReducer = combineReducers({ decks, quizzes });
export default rootReducer;