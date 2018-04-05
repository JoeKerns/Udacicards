import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

export const DECK_KEY = 'UdaciCards:decks';
export const NOTIFICATION_KEY = 'UdaciCards:notifications';

const initialData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

export function getDecks() {
  return AsyncStorage.getItem(DECK_KEY).then((results) => {
      return results === null ? initialData : JSON.parse(results)
    }
  )
}

export function deckSaveToAsync(newDeck) {
  return AsyncStorage.mergeItem(DECK_KEY, JSON.stringify(newDeck))
}

export function deckAddCardToAsync(title,qanda) {
  return AsyncStorage.getItem(DECK_KEY)
    .then((result) => {
      const decks = JSON.parse(result);
      decks[title].questions.push(qanda);
      AsyncStorage.setItem(DECK_KEY, JSON.stringify(decks));
    }
  )
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'You need to study!',
    body: "👋 don't forget to study your flashcards today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1) // 
              tomorrow.setHours(9)
              tomorrow.setMinutes(1)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}