export const GET_DECKS = 'GET_DECKS';

export const decksGet = () => dispatch =>
  api.getDecks()
    .then(({ decks }) => 
      dispatch({
        type: GET_DECKS,
        decks
      })
  );