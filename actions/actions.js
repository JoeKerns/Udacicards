export const GET_DECKS = 'GET_DECKS';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const SAVE_DECK = 'SAVE_DECK';
export const QUESTION_LOG = 'QUESTION_LOG';
export const RESET_QUIZ = 'RESET_QUIZ';

export function decksGet (decks) {
  return {
    type: GET_DECKS,
    decks,
  }
}

export function saveQuestion (deckTitle, qanda) {
  return {
    type: SAVE_QUESTION,
    deckTitle,
    qanda,
  }
}

export function saveDeck (newDeck) {
  return {
    type: SAVE_DECK,
    newDeck,
  }
}

export function logQuestion (result) {
  return {
    type: QUESTION_LOG,
    result
  }
}

export function resetQuiz () {
  return {
    type: RESET_QUIZ
  }
}

